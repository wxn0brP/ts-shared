import { Transport, LogEntry } from "../logger.js";
export declare class FileTransport implements Transport {
    private filePath;
    constructor(filePath: string);
    log(entry: LogEntry): void;
    debug(entry: LogEntry, ...any: any): void;
}
