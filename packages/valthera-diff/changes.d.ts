export type Item = {
    [key: string]: any;
};
export interface ProcessDbChangesResult {
    itemsToAdd: Item[];
    itemsToRemove: Item[];
    itemsToUpdate: Item[];
    itemsWithRemovedFields: Item[];
}
/**
 * Processes changes in two arrays of objects, returning three arrays:
 * - itemsToAdd - objects present in newData but not in oldData
 * - itemsToRemove - objects present in oldData but not in newData
 * - itemsToUpdate - objects present in both arrays but with different values in tracked properties
 * - itemsWithRemovedFields - objects present in newData but with deleted fields
 *
 * @param oldData - array of objects representing the old data
 * @param newData - array of objects representing the new data
 * @param trackParams - array of properties to track for updates
 * @param idName - property name to use as id
 * @returns an object with four properties: itemsToAdd, itemsToRemove, itemsToUpdate, itemsWithRemovedFields
 */
export default function processDbChanges<T extends Item>(oldData: T[], newData: T[], trackParams?: string[], idName?: string): ProcessDbChangesResult;
/**
 * Checks if two objects are equal on given properties.
 * @param obj1 - the first object
 * @param obj2 - the second object
 * @param params - the properties to check
 * @returns true if the objects are equal on all given properties
 */
export declare function areObjectsEqual(obj1: Item, obj2: Item, params: string[]): boolean;
