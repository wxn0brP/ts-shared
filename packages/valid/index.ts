const valid = {
    /**
     * Check if a value is a string within a specified length range.
     */
    str: (str: string, min: number = 0, max: number = Infinity): boolean => {
        return typeof str == "string" && str.length >= min && str.length <= max;
    },

    /**
     * Check if a value is a number.
     */
    num: (data: number, min: number = 0, max: number = Infinity): boolean => {
        return typeof data == "number" && data >= min && data <= max;
    },

    /**
     * Check if an array contains only values of a specified type.
     */
    arrayContainsOnlyType: (arr: any[], type: string): boolean => {
        if (!Array.isArray(arr)) return false;
        for (const value of arr) {
            if (typeof value !== type) return false;
        }
        return true;
    },

    /**
     * Check if an array contains only strings within a specified length range.
     */
    arrayString: (arr: string[], min: number = 0, max: number = Infinity): boolean => {
        if (!Array.isArray(arr)) return false;
        for (const value of arr) {
            if (!valid.str(value, min, max)) return false;
        }
        return true;
    },

    /**
     * Check if an array contains only valid IDs.
     */
    arrayId: (arr: string[]): boolean => {
        if (!Array.isArray(arr)) return false;
        for (const value of arr) {
            if (!valid.id(value)) return false;
        }
        return true;
    },

    /**
     * Check if an id is valid.
     */
    id: (id: string): boolean => {
        if (typeof id !== "string") return false;
        if (id.startsWith("$")) id = id.replace("$", "");

        const parts = id.split("-");
        if (parts.length != 3) return false;

        const regex = /^[a-z0-9]+$/;
        for (const part of parts) {
            if (!regex.test(part)) return false;
        }
        return true;
    },

    /**
     * Check if a value is a valid id or is included in a list of specific strings.
     */
    idOrSpecificStr: (data: string, strings: string[] = []): boolean => {
        if (valid.id(data)) return true;
        return strings.includes(data);
    },

    /**
     * Check if a value is a valid id, or if it starts with any of the provided prefixes followed by a valid id.
     */
    idWithPrefix: (data: string, prefixes: string[] | false[] = []): boolean => {
        for (const prefix of prefixes) {
            if (prefix === false) return valid.id(data);
            if (data.startsWith(prefix)) {
                const remainingText = data.slice(prefix.length);
                return valid.id(remainingText);
            }
        }
        return false;
    },

    /**
     * Check if a value is a valid id, or if it starts with any of the provided prefixes followed by a valid id, or if it is included in a list of specific strings.
     */
    idWithPrefixOrSpecificStr: (data: string, prefixes: string[] = [], strings: string[] = []): boolean => {
        if (valid.idWithPrefix(data, prefixes)) return true;
        return valid.idOrSpecificStr(data, strings);
    },

    /**
     * Check if a value is a boolean.
     */
    bool: (data: boolean, value?: boolean): boolean => {
        return typeof data == "boolean" && (value === undefined || data === value);
    }
};

export default valid;