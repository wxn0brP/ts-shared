import { ConsoleTransport } from "./transports/console";

export enum LogLevel {
    ERROR,
    WARN,
    INFO,
    DEBUG
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

export class Logger {
    transports: Transport[]
    loggerName: string
    public logLevel: LogLevel

    constructor(options: LoggerOptions = {}) {
        this.transports = options.transports ?? [new ConsoleTransport()],
        this.loggerName = options.loggerName ?? "";
        if (options.logLevel) {
            const logLevel = options.logLevel.toUpperCase() as LogLevelName;
            if (typeof LogLevel[logLevel] === "number") this.logLevel = LogLevel[logLevel];
            else this.logLevel = LogLevel.ERROR;
        }
        else this.logLevel = LogLevel.ERROR;
    }

    private createEntry(level: LogLevelName, message: string, meta?: Record<string, any>): LogEntry {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            meta,
            loggerName: this.loggerName
        }
    }

    private async log(level: LogLevel, message: string, meta?: Record<string, any>) {
        if (level > this.logLevel) return;

        const entry = this.createEntry(LogLevel[level] as any, message, meta);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }

    debug(msg: string, meta?: Record<string, any>) {
        return this.log(LogLevel.DEBUG, msg, meta);
    }

    info(msg: string, meta?: Record<string, any>) {
        return this.log(LogLevel.INFO, msg, meta);
    }

    warn(msg: string, meta?: Record<string, any>) {
        return this.log(LogLevel.WARN, msg, meta);
    }

    error(msg: string, meta?: Record<string, any>) {
        return this.log(LogLevel.ERROR, msg, meta);
    }

    async dd(...any: any) {
        const entry = this.createEntry("DEBUG", "");
        for (const transport of this.transports) {
            await transport.debug(entry, ...any);
        }
    }
}