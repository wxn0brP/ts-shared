/**
 * Save database changes
 */
export async function saveDbChanges(db, doc, changes, idName = "_id") {
    const { itemsToAdd, itemsToRemove, itemsToUpdate, itemsWithRemovedFields } = changes;
    const dbc = db.c(doc);
    // Add new items
    for (const item of itemsToAdd) {
        await dbc.add(item);
    }
    // Remove items
    for (const item of itemsToRemove) {
        await dbc.remove({ [idName]: item[idName] });
    }
    // Update items
    for (const item of itemsToUpdate) {
        await dbc.update({ [idName]: item[idName] }, item);
    }
    // Handle fields removal (unset)
    for (const item of itemsWithRemovedFields) {
        const unset = Object.fromEntries(item.deletedParams.map((p) => [p, true]));
        await dbc.update({ [idName]: item[idName] }, { $unset: unset });
    }
}
