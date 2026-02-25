import { ValtheraCompatible } from "@wxn0brp/db-core";
import { Collection } from "@wxn0brp/db-core/helpers/collection";
declare class KeyManager {
    private db;
    collection: Collection;
    constructor(db: ValtheraCompatible);
    getKeyPair(index: number): Promise<{
        publicKey: CryptoKey;
        privateKey: CryptoKey;
    }>;
    addKeyPair(index: number): Promise<void>;
    initKeyPairs<K>(keys: K): Promise<void>;
}
export default KeyManager;
export { KeyManager };
