import { generateKeyPair, exportSPKI, exportPKCS8, importSPKI, importPKCS8 } from "jose";
import { DataBase } from "@wxn0brp/db";

enum KeyIndex {
    GENERAL,
    TEMPORARY,
    USER_TOKEN,
    BOT_TOKEN,
    WEBHOOK_TOKEN,
};

class KeyManager{
    constructor(private db: DataBase){}

    async getKeyPair(index = KeyIndex.GENERAL){
        const keyPair = await this.db.findOne("encryptionKeys", { index });
        if(!keyPair) return null;

        return {
            publicKey: await importSPKI(keyPair.pub, "RSA-OAEP-256"),
            privateKey: await importPKCS8(keyPair.prv, "RSA-OAEP-256")
        };
    }

    async addKeyPair(index: KeyIndex){
        const { publicKey, privateKey } = await generateKeyPair("RSA-OAEP-256");
        const publicKeyPEM = await exportSPKI(publicKey);
        const privateKeyPEM = await exportPKCS8(privateKey);

        await this.db.add("encryptionKeys", {
            index,
            pub: publicKeyPEM,
            prv: privateKeyPEM
        }, false);
    }

    async initKeyPairs(){
        for(const index of Object.values(KeyIndex)){
            if(typeof index !== "number") continue;
            const exists = await this.db.findOne("encryptionKeys", { index });
            if(exists) continue;
            await this.addKeyPair(index);
        }
    }
}

export default KeyManager;
export { KeyIndex, KeyManager };