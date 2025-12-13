import { ValtheraCompatible } from "@wxn0brp/db-core";
declare class KeyManager {
    private db;
    constructor(db: ValtheraCompatible);
    getKeyPair(index: number): Promise<{
        publicKey: import("jose").KeyLike;
        privateKey: import("jose").KeyLike;
    }>;
    addKeyPair(index: number): Promise<void>;
    initKeyPairs<K>(keys: K): Promise<void>;
}
export default KeyManager;
export { KeyManager };
