export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    meta?: Record<string, any>;
    loggerName?: string;
}
export interface Transport {
    log(entry: LogEntry): Promise<void> | void;
}
export declare class Logger {
    private transports;
    loggerName: string;
    constructor(transports?: Transport[], loggerName?: string);
    private createEntry;
    private log;
    debug(msg: string, meta?: Record<string, any>): Promise<void>;
    info(msg: string, meta?: Record<string, any>): Promise<void>;
    warn(msg: string, meta?: Record<string, any>): Promise<void>;
    error(msg: string, meta?: Record<string, any>): Promise<void>;
}
