const valid = {
    /**
     * Check if a value is a string within a specified length range.
     */
    str: (str, min = 0, max = Infinity) => {
        return typeof str == "string" && str.length >= min && str.length <= max;
    },
    /**
     * Check if a value is a number.
     */
    num: (data, min = 0, max = Infinity) => {
        return typeof data == "number" && data >= min && data <= max;
    },
    /**
     * Check if an array contains only values of a specified type.
     */
    arrayContainsOnlyType: (arr, type) => {
        if (!Array.isArray(arr))
            return false;
        for (const value of arr) {
            if (typeof value !== type)
                return false;
        }
        return true;
    },
    /**
     * Check if an array contains only strings within a specified length range.
     */
    arrayString: (arr, min = 0, max = Infinity) => {
        if (!Array.isArray(arr))
            return false;
        for (const value of arr) {
            if (!valid.str(value, min, max))
                return false;
        }
        return true;
    },
    /**
     * Check if an array contains only valid IDs.
     */
    arrayId: (arr) => {
        if (!Array.isArray(arr))
            return false;
        for (const value of arr) {
            if (!valid.id(value))
                return false;
        }
        return true;
    },
    /**
     * Check if an id is valid.
     */
    id: (id) => {
        if (typeof id !== "string")
            return false;
        if (id.startsWith("$"))
            id = id.replace("$", "");
        const parts = id.split("-");
        if (parts.length != 3)
            return false;
        const regex = /^[a-z0-9]+$/;
        for (const part of parts) {
            if (!regex.test(part))
                return false;
        }
        return true;
    },
    /**
     * Check if a value is a valid id or is included in a list of specific strings.
     */
    idOrSpecificStr: (data, strings = []) => {
        if (valid.id(data))
            return true;
        return strings.includes(data);
    },
    /**
     * Check if a value is a valid id, or if it starts with any of the provided prefixes followed by a valid id.
     */
    idWithPrefix: (data, prefixes = []) => {
        for (const prefix of prefixes) {
            if (prefix === false)
                return valid.id(data);
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
    idWithPrefixOrSpecificStr: (data, prefixes = [], strings = []) => {
        if (valid.idWithPrefix(data, prefixes))
            return true;
        return valid.idOrSpecificStr(data, strings);
    },
    /**
     * Check if a value is a boolean.
     */
    bool: (data, value) => {
        return typeof data == "boolean" && (value === undefined || data === value);
    }
};
export default valid;
