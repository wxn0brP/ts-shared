import { appendFileSync, mkdirSync } from "fs";
import { Transport, LogEntry } from "../logger";
import * as path from "path";

export class FileTransport implements Transport {
    constructor(private filePath: string) {
        mkdirSync(path.dirname(this.filePath), { recursive: true });
    }

    log(entry: LogEntry) {
        let prefix = "";
        if (entry.loggerName) prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] "
        prefix += "[" + entry.level.toUpperCase() + "]";

        const logLine = `${prefix} ${entry.message} ${entry.meta ? JSON.stringify(entry.meta) : ""}\n`;
        appendFileSync(this.filePath, logLine);
    }

    debug(entry: LogEntry, ...any: any): void {
        for (const data of any) this.log(Object.assign(entry, { meta: data }));
    }
}
