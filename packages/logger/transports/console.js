export class ConsoleTransport {
    log(entry) {
        let prefix = "";
        if (entry.loggerName)
            prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] ";
        prefix += "[" + entry.level.toUpperCase() + "]";
        if (entry.level === "debug")
            console.dir([prefix, entry.message, entry.meta ?? ""], { depth: null });
        else
            console.log(prefix, entry.message, entry.meta ?? "");
    }
}
