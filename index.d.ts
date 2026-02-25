export declare const sandbox: {
    console: {
        log: (...data: any[]) => void;
    };
    Math: Math;
    Date: DateConstructor;
    JSON: JSON;
    require: any;
    module: any;
    exports: any;
    process: any;
    Buffer: any;
};
export declare function changeStringToFunction(func: string): (data: any, ctx: any) => any;
export declare function deserializeFunctions(data: Record<string, any>, keys: string[]): Record<string, any> | any[];
