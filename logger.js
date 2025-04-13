import { ConsoleTransport } from "./transports/console.js";
export class Logger {
    transports;
    loggerName;
    constructor(transports = [new ConsoleTransport()], loggerName = "") {
        this.transports = transports;
        this.loggerName = loggerName;
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
        const entry = this.createEntry(level, message, meta);
        for (const transport of this.transports) {
            await transport.log(entry);
        }
    }
    debug(msg, meta) {
        return this.log('debug', msg, meta);
    }
    info(msg, meta) {
        return this.log('info', msg, meta);
    }
    warn(msg, meta) {
        return this.log('warn', msg, meta);
    }
    error(msg, meta) {
        return this.log('error', msg, meta);
    }
}
