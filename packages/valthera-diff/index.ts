import { saveDbChanges as save } from "./save.js";
import process from "./changes.js";
export * as ValtheraChanges from "./changes.js";

const valtheraDiff = {
    save,
    process,
}

export default valtheraDiff;