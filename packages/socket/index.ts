import { Socket } from "socket.io";
import SocketEventLimiter from "./limiter";
import { Events, Socket_StandardRes, Socket_StandardRes_Error } from "./types";
import SocketEventEngine from "./engine";

export function setupSocket(socket: Socket, all_events: Events[][]) {
    socket.logError = (e) => {
        console.log("Error: ", e);
    }

    const limiter = new SocketEventLimiter(socket);
    socket.onLimit = limiter.onLimit.bind(limiter);
    
    socket.processSocketError = (res: Socket_StandardRes, cb?: Function) => {
        const err = res.err;
        if(!Array.isArray(err)) return false;

        const [event, ...args] = err as Socket_StandardRes_Error;
        if(cb) cb(...args);
        else socket.emit(event, ...args);
        return true;
    }

    const engine = new SocketEventEngine(socket);
    
    for (const events of all_events) {
        for (const event of events) {
            engine.add(event[0], event[1], event[2], event[3]);
        }
    }

    return {
        socket,
        engine,
        limiter
    }
}