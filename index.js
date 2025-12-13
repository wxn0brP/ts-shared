import SocketEventLimiter from "./limiter.js";
import SocketEventEngine from "./engine.js";
export function setupSocket(socket, all_events) {
    socket.logError = (e) => {
        console.log("Error: ", e);
    };
    const limiter = new SocketEventLimiter(socket);
    socket.onLimit = limiter.onLimit.bind(limiter);
    socket.processSocketError = (res, cb) => {
        const err = res.err;
        if (!Array.isArray(err))
            return false;
        const [event, ...args] = err;
        if (cb)
            cb(...args);
        else
            socket.emit(event, ...args);
        return true;
    };
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
    };
}
