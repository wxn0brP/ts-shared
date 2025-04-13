import { Transport, LogEntry } from "../logger.js";
export declare class ConsoleTransport implements Transport {
    log(entry: LogEntry): void;
}
