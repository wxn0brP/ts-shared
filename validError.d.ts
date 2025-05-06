import { Socket_event, Socket_StandardRes } from "./types.js";
export default class ValidError {
    module: Socket_event;
    constructor(module: Socket_event);
    valid(...err: any[]): Socket_StandardRes;
    err(...err: any[]): Socket_StandardRes;
}
