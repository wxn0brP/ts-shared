export class ValtheraDBTransport {
    db;
    collection;
    constructor(db, collection = "logs") {
        this.db = db;
        this.collection = collection;
    }
    async log(entry) {
        await this.db.add(this.collection, entry);
    }
    async debug(entry, ...any) {
        for (const data of any)
            await this.db.add(this.collection, Object.assign(entry, { meta: data }));
    }
}
