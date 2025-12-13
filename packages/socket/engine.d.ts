import { Socket } from "socket.io";
declare class SocketEventEngine {
    socket: Socket;
    constructor(socket: Socket);
    add(evt: string, time: number, isReturn: boolean, cpu: Function): void;
}
export default SocketEventEngine;
