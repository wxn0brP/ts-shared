import { ConsoleTransport } from "./transports/console.js";
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel || (LogLevel = {}));
export class Logger {
    transports;
    loggerName;
    logLevel;
    constructor(options = {}) {
        this.transports = options.transports ?? [new ConsoleTransport()],
            this.loggerName = options.loggerName ?? "";
        if (options.logLevel) {
            const logLevel = options.logLevel.toUpperCase();
            if (typeof LogLevel[logLevel] === "number")
                this.logLevel = LogLevel[logLevel];
            else
                this.logLevel = LogLevel.ERROR;
        }
        else
            this.logLevel = LogLevel.ERROR;
    }
    createEntry(level, message, meta) {
        return {
            level,
            message,
            timestamp: new Date().toISOString(),
            meta,
            loggerName: this.loggerName
        };
    }
    async log(level, message, meta) {
        if (level > this.logLevel)
            return;
        const entry = this.createEntry(LogLevel[level], message, meta);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }
    debug(msg, meta) {
        return this.log(LogLevel.DEBUG, msg, meta);
    }
    info(msg, meta) {
        return this.log(LogLevel.INFO, msg, meta);
    }
    warn(msg, meta) {
        return this.log(LogLevel.WARN, msg, meta);
    }
    error(msg, meta) {
        return this.log(LogLevel.ERROR, msg, meta);
    }
    async dd(...any) {
        const entry = this.createEntry("DEBUG", "");
        for (const transport of this.transports) {
            await transport.debug(entry, ...any);
        }
    }
}
