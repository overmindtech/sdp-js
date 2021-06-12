import { ItemRequest } from "./index";
import { Response } from "./responses_pb";
export declare enum ResponderStatus {
    Working = 0,
    Stalled = 1,
    Complete = 2,
    Failed = 3
}
export declare class Responder {
    context: string;
    lastStatusTime: Date;
    nextStatusTime: Date | undefined;
    error: string;
    private _lastStatus;
    constructor(context: string);
    set status(status: ResponderStatus);
    get status(): ResponderStatus;
}
export declare class RequestProgress {
    responders: Map<string, Responder>;
    request: ItemRequest;
    constructor(request: ItemRequest);
    private countOfStatus;
    numWorking(): number;
    numStalled(): number;
    numComplete(): number;
    numFailed(): number;
    processResponse(response: Response): void;
}
//# sourceMappingURL=progress.d.ts.map