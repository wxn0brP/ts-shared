class SocketEventEngine {
    socket;
    constructor(socket) {
        this.socket = socket;
    }
    add(evt, time, isReturn, cpu) {
        this.socket.onLimit(evt, time, async (...args) => {
            try {
                const data = await cpu(this.socket.user, ...args);
                if (this.socket.processSocketError(data))
                    return;
                if (isReturn) {
                    const cb = typeof args[args.length - 1] === "function" ? args.pop() : null;
                    const res = data.res || [];
                    if (cb)
                        cb(...res);
                    else
                        this.socket.emit(evt, ...res);
                }
            }
            catch (e) {
                this.socket.logError(e);
            }
        });
    }
}
export default SocketEventEngine;
