import { Transport, LogEntry } from "../logger.js";

export class ConsoleTransport implements Transport {
    log(entry: LogEntry): void {
        let prefix = "";
        if (entry.loggerName) prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] "
        prefix += "[" + entry.level.toUpperCase() + "]";

        if (entry.level === "debug") 
            console.dir([prefix, entry.message, entry.meta ?? ""], { depth: null });
        else
            console.log(prefix, entry.message, entry.meta ?? "");
    }
}
