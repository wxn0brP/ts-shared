import { ValtheraCompatible } from "@wxn0brp/db-core";
import { ProcessDbChangesResult } from "./changes.js";
/**
 * Save database changes
 */
export declare function saveDbChanges(db: ValtheraCompatible, doc: string, changes: ProcessDbChangesResult, idName?: string): Promise<void>;
