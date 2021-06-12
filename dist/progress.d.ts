import { ItemRequest } from ".";
import { Response } from "./dist/responses_pb";
export declare enum ResponderStatus {
    Working = 0,
    Stalled = 1,
    Complete = 2,
    Failed = 3
}
export declare class Responder {
    context: string;
    lastStatusTime: Date;
    error: string;
    private _lastStatus;
    constructor(context: string);
    set lastStatus(status: ResponderStatus);
    get lastStatus(): ResponderStatus;
}
export declare class RequestProgress {
    responders: Map<string, Responder>;
    request: ItemRequest;
    constructor(request: ItemRequest);
    processResponse(response: Response): void;
}
//# sourceMappingURL=progress.d.ts.map