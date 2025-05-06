export class ConsoleTransport {
    log(entry) {
        let prefix = "";
        if (entry.loggerName)
            prefix += `[${entry.loggerName}] `;
        prefix += "[" + entry.timestamp + "] ";
        prefix += "[" + entry.level.toUpperCase() + "]";
        if (entry.level === "DEBUG") {
            console.log(prefix, entry.message);
            if (entry.meta)
                console.dir(entry.meta, { depth: null });
        }
        else
            console.log(prefix, entry.message, entry.meta ?? "");
    }
    debug(entry, ...any) {
        this.log(Object.assign(entry, { meta: any[0] }));
        for (const data of any.slice(1))
            console.dir(data, { depth: null });
        console.log("[DEBUG];");
    }
}
