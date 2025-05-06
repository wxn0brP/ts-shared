import { Valthera } from "@wxn0brp/db";
declare class KeyManager {
    private db;
    constructor(db: Valthera);
    getKeyPair(index: number): Promise<{
        publicKey: import("jose").KeyLike;
        privateKey: import("jose").KeyLike;
    }>;
    addKeyPair(index: number): Promise<void>;
    initKeyPairs<K>(keys: K): Promise<void>;
}
export default KeyManager;
export { KeyManager };
