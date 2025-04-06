import { generateKeyPair, exportSPKI, exportPKCS8, importSPKI, importPKCS8 } from "jose";
import { DataBase } from "@wxn0brp/db";

class KeyManager {
    constructor(private db: DataBase) { }

    async getKeyPair(index: number) {
        const keyPair = await this.db.findOne("encryptionKeys", { index });
        if (!keyPair) return null;

        return {
            publicKey: await importSPKI(keyPair.pub, "RSA-OAEP-256"),
            privateKey: await importPKCS8(keyPair.prv, "RSA-OAEP-256")
        };
    }

    async addKeyPair(index: number) {
        const { publicKey, privateKey } = await generateKeyPair("RSA-OAEP-256");
        const publicKeyPEM = await exportSPKI(publicKey);
        const privateKeyPEM = await exportPKCS8(privateKey);

        await this.db.add("encryptionKeys", {
            index,
            pub: publicKeyPEM,
            prv: privateKeyPEM
        }, false);
    }

    async initKeyPairs<K>(keys: K) {
        for (const k of Object.keys(keys)) {
            const index = keys[k];
            if (typeof index !== "number") continue;
            const exists = await this.db.findOne("encryptionKeys", { index });
            if (exists) continue;
            await this.addKeyPair(index);
        }
    }
}

export default KeyManager;
export { KeyManager };