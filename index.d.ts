import { Socket } from "socket.io";
import SocketEventLimiter from "./limiter.js";
import { Events } from "./types.js";
import SocketEventEngine from "./engine.js";
export declare function setupSocket(socket: Socket, all_events: Events[][]): {
    socket: Socket<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
    engine: SocketEventEngine;
    limiter: SocketEventLimiter;
};
