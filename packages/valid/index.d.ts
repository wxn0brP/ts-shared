declare const valid: {
    /**
     * Check if a value is a string within a specified length range.
     */
    str: (str: string, min?: number, max?: number) => boolean;
    /**
     * Check if a value is a number.
     */
    num: (data: number, min?: number, max?: number) => boolean;
    /**
     * Check if an array contains only values of a specified type.
     */
    arrayContainsOnlyType: (arr: any[], type: string) => boolean;
    /**
     * Check if an array contains only strings within a specified length range.
     */
    arrayString: (arr: string[], min?: number, max?: number) => boolean;
    /**
     * Check if an array contains only valid IDs.
     */
    arrayId: (arr: string[]) => boolean;
    /**
     * Check if an id is valid.
     */
    id: (id: string) => boolean;
    /**
     * Check if a value is a valid id or is included in a list of specific strings.
     */
    idOrSpecificStr: (data: string, strings?: string[]) => boolean;
    /**
     * Check if a value is a valid id, or if it starts with any of the provided prefixes followed by a valid id.
     */
    idWithPrefix: (data: string, prefixes?: string[] | false[]) => boolean;
    /**
     * Check if a value is a valid id, or if it starts with any of the provided prefixes followed by a valid id, or if it is included in a list of specific strings.
     */
    idWithPrefixOrSpecificStr: (data: string, prefixes?: string[], strings?: string[]) => boolean;
    /**
     * Check if a value is a boolean.
     */
    bool: (data: boolean, value?: boolean) => boolean;
};
export default valid;
