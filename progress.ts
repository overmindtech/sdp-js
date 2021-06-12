import { Util } from ".";
import { ItemRequest } from ".";
import { Response } from "./dist/responses_pb";

// The status of a given responder
export enum ResponderStatus {
    Working,
    Stalled,
    Complete,
    Failed,
}

// Represents something that is responding to our query
export class Responder {
    context: string = "";
	lastStatusTime: Date = new Date();
	error: string = "";
	private _lastStatus: ResponderStatus = ResponderStatus.Complete;

    constructor(context: string) {
        this.context = context;
        this.lastStatus = ResponderStatus.Working;
    }

    // Sets the status and updates the LastStatus to the current time
    set lastStatus(status: ResponderStatus) {
        // Set last status time to now
        this.lastStatusTime = new Date();

        this._lastStatus = status;
    }

    // Get the last status of this responder
    get lastStatus(): ResponderStatus {
        return this._lastStatus;
    }
}

export class RequestProgress {
    responders: Map<string, Responder> = new Map<string, Responder>();
    request: ItemRequest;

    constructor(request: ItemRequest) {
        this.request = request;
    }

    processResponse(response: Response): void {
        // Pull details out of the response
        const context = response.getContext();
        var state: ResponderStatus;
        var nextUpdateTime: Date | undefined = undefined;

        // Map states
        switch(response.getState()) {
            case Response.ResponseState.COMPLETE: {
                state = ResponderStatus.Complete;
                break;
            }
            case Response.ResponseState.WORKING: {
                state = ResponderStatus.Working;
                break;
            }
        }

        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            Util.toDate(nextUpdateIn);
        }



        var responder = this.responders.get(context);

        if (typeof responder == 'undefined') {
            // If the responder iss undefined then we need to create one
            responder = new Responder(context);
            // responder.lastStatus =
        } else {
            // Update the responder
        }
    }
}