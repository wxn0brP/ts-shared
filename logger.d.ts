export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
export type LogLevelName = keyof typeof LogLevel;
export type LogLevelNameLowerCase = Lowercase<LogLevelName>;
export interface LogEntry {
    level: LogLevelName;
    message: string;
    timestamp: string;
    meta?: Record<string, any>;
    loggerName?: string;
}
export interface LoggerOptions {
    transports?: Transport[];
    loggerName?: string;
    logLevel?: LogLevelName | LogLevelNameLowerCase;
}
export interface Transport {
    log(entry: LogEntry): Promise<void> | void;
    debug(entry: LogEntry, ...any: any): Promise<void> | void;
}
export declare class Logger {
    transports: Transport[];
    loggerName: string;
    logLevel: LogLevel;
    constructor(options?: LoggerOptions);
    private createEntry;
    private log;
    debug(msg: string, meta?: Record<string, any>): Promise<void>;
    info(msg: string, meta?: Record<string, any>): Promise<void>;
    warn(msg: string, meta?: Record<string, any>): Promise<void>;
    error(msg: string, meta?: Record<string, any>): Promise<void>;
    dd(...any: any): Promise<void>;
}
