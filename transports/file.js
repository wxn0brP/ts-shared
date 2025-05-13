import { appendFileSync, mkdirSync } from "fs";
import * as path from "path";
export class FileTransport {
    filePath;
    constructor(filePath) {
        this.filePath = filePath;
        mkdirSync(path.dirname(this.filePath), { recursive: true });
    }
    log(entry) {
        let prefix = "";
        if (entry.loggerName)
            prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] ";
        prefix += "[" + entry.level.toUpperCase() + "]";
        const logLine = `${prefix} ${entry.message} ${entry.meta ? JSON.stringify(entry.meta) : ""}\n`;
        appendFileSync(this.filePath, logLine);
    }
    debug(entry, ...any) {
        for (const data of any)
            this.log(Object.assign(entry, { meta: data }));
    }
}
