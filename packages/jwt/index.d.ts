import { JWTPayload } from "jose";
import KeyManager from "./KeyManager.js";
import { ValtheraCompatible } from "@wxn0brp/db-core";
export declare enum KeyIndex {
    GENERAL = 0
}
export declare class JwtManager<K = KeyIndex> {
    keyManager: KeyManager;
    private secretKey;
    private keyIndex;
    constructor(keyIndex?: K, secretKey?: string);
    init(db: ValtheraCompatible): Promise<void>;
    /**
     * Creates a JWT token, either encrypted or plain.
     * @param data - User data to include in the token.
     * @param exp - Expiration time for the token; false means no expiration.
     * @param encrypt - If true, the token is encrypted; if a number, selects a specific key pair for encryption.
     * @returns Returns an encrypted token (JWE) or a signed token (JWS).
    */
    create(data: JWTPayload, exp?: boolean | number | string, encrypt?: boolean | number): Promise<string>;
    /**
     * Decrypts and verifies a JWT token.
     * @param token - The JWT token to verify.
     * @param keyIndex - Index of the key for decryption (for encrypted tokens).
     * @returns Returns the token payload if valid; otherwise, null.
     */
    decode(token: string, keyIndex?: number | false): Promise<JWTPayload | null>;
}
export default JwtManager;
