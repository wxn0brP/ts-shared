import { createContext, runInContext } from "node:vm";

export const sandbox = {
    console: {
        log: console.log,
    },
    Math,
    Date,
    JSON,
    require: undefined,
    module: undefined,
    exports: undefined,
    process: undefined,
    Buffer: undefined,
};

export function changeStringToFunction(func: string) {
    try {
        return function (data: any, ctx: any) {
            const context = createContext({ ...ctx, ...sandbox });
            const userFunction = runInContext(`(${func})`, context);
            if (typeof userFunction !== "function") throw new Error("Invalid function");
            return userFunction(data, ctx);
        }
    } catch (e) {
        throw new Error("Invalid function");
    }
}

export function deserializeFunctions(data: Record<string, any>, keys: string[][]): Record<string, any> | any[] {
    const setAtPath = (obj: Record<string, any>, segments: string[], value: any) => {
        let currentLevel = obj;

        for (let i = 0; i < segments.length - 1; i++) {
            const segment = segments[i];
            if (!currentLevel[segment]) currentLevel[segment] = {};
            currentLevel = currentLevel[segment];
        }

        currentLevel[segments[segments.length - 1]] = value;
    };

    const getAtPath = (obj: Record<string, any>, segments: string[]) => {
        return segments.reduce((acc, key) => acc && acc[key], obj);
    };

    keys.forEach((segments) => {
        const value = getAtPath(data, segments);

        if (typeof value === "string") {
            const fn = changeStringToFunction(value);
            setAtPath(data, segments, fn);
        } else if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === "string") {
                        value[index] = changeStringToFunction(item);
                    }
                });
            } else {
                Object.keys(value).forEach((key) => {
                    if (typeof value[key] === "string") {
                        value[key] = changeStringToFunction(value[key]);
                    }
                });
            }
        }
    });

    return data;
}
