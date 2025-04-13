import { ConsoleTransport } from "./transports/console";

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

export class Logger {
    constructor(
        private transports: Transport[] = [new ConsoleTransport()],
        public loggerName: string = ""
    ) {
    }

    private createEntry(level: LogLevel, message: string, meta?: Record<string, any>): LogEntry {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            meta,
            loggerName: this.loggerName
        };
    }

    private async log(level: LogLevel, message: string, meta?: Record<string, any>) {
        const entry = this.createEntry(level, message, meta);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }

    debug(msg: string, meta?: Record<string, any>) {
        return this.log('debug', msg, meta);
    }

    info(msg: string, meta?: Record<string, any>) {
        return this.log('info', msg, meta);
    }

    warn(msg: string, meta?: Record<string, any>) {
        return this.log('warn', msg, meta);
    }

    error(msg: string, meta?: Record<string, any>) {
        return this.log('error', msg, meta);
    }
}
