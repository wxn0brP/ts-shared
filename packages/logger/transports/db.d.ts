import { Valthera, ValtheraRemote } from "@wxn0brp/db";
import { Transport, LogEntry } from "../logger.js";
export declare class ValtheraDBTransport implements Transport {
    db: Valthera | ValtheraRemote;
    collection: string;
    constructor(db: Valthera | ValtheraRemote, collection?: string);
    log(entry: LogEntry): Promise<void>;
    debug(entry: LogEntry, ...any: any): Promise<void>;
}
