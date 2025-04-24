import { Valthera, ValtheraRemote } from "@wxn0brp/db";
import { Transport, LogEntry } from "../logger.js";

export class ValtheraDBTransport implements Transport {
    constructor(
        public db: Valthera | ValtheraRemote,
        public collection = "logs"
    ) {}

    async log(entry: LogEntry): Promise<void> {
        await this.db.add(this.collection, entry);
    }

    async debug(entry: LogEntry, ...any: any): Promise<void> {
        for (const data of any) await this.db.add(this.collection, Object.assign(entry, { meta: data }));
    }
}
