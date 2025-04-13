import { Valthera } from "@wxn0brp/db";
import { ProcessDbChangesResult } from "./changes.js";
/**
 * Save database changes
 */
export declare function saveDbChanges(db: Valthera, doc: string, changes: ProcessDbChangesResult, idName?: string): Promise<void>;
