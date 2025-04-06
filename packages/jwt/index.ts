import { SignJWT, jwtVerify, jwtDecrypt, EncryptJWT, JWTPayload } from "jose";
import KeyManager from "./KeyManager.js";
import { DataBase } from "@wxn0brp/db";

export enum KeyIndex {
    GENERAL,
}

export class JwtManager<K = KeyIndex> {
    public keyManager: KeyManager;
    private secretKey: Uint8Array;

    constructor(
        db: DataBase,
        private keyIndex: K,
        secretKey: string = process.env.JWT
    ) {
        this.keyManager = new KeyManager(db);
        this.secretKey = new TextEncoder().encode(secretKey);
        this.keyManager.initKeyPairs<K>(keyIndex);
    }

    /**
     * Creates a JWT token, either encrypted or plain.
     * @param data - User data to include in the token.
     * @param exp - Expiration time for the token; false means no expiration.
     * @param encrypt - If true, the token is encrypted; if a number, selects a specific key pair for encryption.
     * @returns Returns an encrypted token (JWE) or a signed token (JWS).
    */
    async create(
        data: JWTPayload,
        exp: boolean | number | string = true,
        encrypt: boolean | number = false
    ): Promise<string> {
        const jwt = new SignJWT(data)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt();

        if (exp !== false) {
            let expValue: string;
            if (exp === true) expValue = "1h";
            else if (typeof exp === "number") expValue = `${exp}s`;
            else expValue = exp;
            jwt.setExpirationTime(expValue);
        }

        const signedToken = await jwt.sign(this.secretKey);

        if (encrypt) {
            const index = typeof encrypt === "number" ? encrypt : 0;

            if (index === 0 && this.keyIndex[0] === undefined) {
                throw new Error("Key index 0 is not defined.");
            }
            
            const keyPair = await this.keyManager.getKeyPair(index);

            if (!keyPair) {
                throw new Error(`Key with index ${index} does not exist.`);
            }

            const encrypted = new EncryptJWT({ token: signedToken })
                .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" });

            if (exp !== false) {
                let expValue: string;
                if (exp === true) expValue = "1h";
                else if (typeof exp === "number") expValue = `${exp}s`;
                else expValue = exp;
                encrypted.setExpirationTime(expValue);
            }

            return await encrypted.encrypt(keyPair.publicKey);
        }

        return signedToken;
    }

    /**
     * Decrypts and verifies a JWT token.
     * @param token - The JWT token to verify.
     * @param keyIndex - Index of the key for decryption (for encrypted tokens).
     * @returns Returns the token payload if valid; otherwise, null.
     */
    async decode(token: string, keyIndex: number | false = false): Promise<JWTPayload | null> {
        try {
            if (keyIndex !== false) {
                const keyPair = await this.keyManager.getKeyPair(keyIndex);
                if (!keyPair) throw new Error(`Key with index ${keyIndex} does not exist.`);

                const { payload } = await jwtDecrypt(token, keyPair.privateKey);
                if (!payload || typeof payload !== "object" || typeof payload.token !== "string") {
                    throw new Error("Malformed encrypted JWT payload.");
                }

                const { payload: verifiedPayload } = await jwtVerify(payload.token, this.secretKey);
                return verifiedPayload;
            } else {
                const { payload } = await jwtVerify(token, this.secretKey);
                return payload;
            }
        } catch (error: any) {
            if (process.env.NODE_ENV === "development") {
                console.log("Token verification error:", error.message || error);
            }
            return null;
        }
    }
}

export default JwtManager;