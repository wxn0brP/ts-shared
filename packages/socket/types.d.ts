import { Socket_User } from "@wxn0brp/wts-socket";
export interface SpamThresholds {
    warningDelay: number;
    warnLimit: number;
    spamLimit: number;
    disconnectLimit: number;
    resetInterval: number;
    banDuration: number;
}
declare module "socket.io" {
    interface Socket {
        user: Socket_User;
        logError: (e: Error) => void;
        onLimit: (event: string, limit: number, fn: Function) => void;
        timeOutMap: Map<string, {
            t: number;
            i: number;
        }>;
        processSocketError: (err: Socket_StandardRes, cb?: Function) => boolean;
    }
}
declare module "@wxn0brp/wts-socket" {
    interface Socket_User {
        _id: string;
    }
}
export type Socket_event = `${Lowercase<string>}` & Exclude<string, `.${string}` | `${string}.`>;
export type Socket_StandardRes_Error = [
    "error" | "error.valid",
    Socket_event,
    ...any[]
];
export interface Socket_StandardRes<T = any> {
    err: false | Socket_StandardRes_Error[];
    res?: T;
}
export type Events = [
    string,
    number,
    boolean,
    (user: Socket_User, ...args: any[]) => Promise<Socket_StandardRes>
];
