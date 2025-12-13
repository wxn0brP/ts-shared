import { saveDbChanges as save } from "./save.js";
import process from "./changes.js";
export * as ValtheraChanges from "./changes.js";
declare const valtheraDiff: {
    save: typeof save;
    process: typeof process;
};
export default valtheraDiff;
