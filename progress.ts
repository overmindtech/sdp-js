import { ItemRequestError } from "./errors_pb";
import { ItemRequest } from "./index";
import { Response } from "./responses_pb";

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
    nextStatusTime: Date | undefined;
	error: string = "";
	private _lastStatus: ResponderStatus = ResponderStatus.Complete;

    constructor(context: string) {
        this.context = context;
        this.status = ResponderStatus.Working;
    }

    // Sets the status and updates the LastStatus to the current time
    set status(status: ResponderStatus) {
        // Set last status time to now
        this.lastStatusTime = new Date();

        this._lastStatus = status;
    }

    // Get the last status of this responder
    get status(): ResponderStatus {
        return this._lastStatus;
    }
}

export class RequestProgress {
    responders: Map<string, Responder> = new Map<string, Responder>();
    request: ItemRequest;

    // This is the result of a setInterval which watches for timeouts and sets
    // nodes as stalled
    private watcher: NodeJS.Timeout;

    // Tracks the number of things currently being processed so that we can be
    // sure that all processing is complete before returning
    private inFlight: number = 0;

    constructor(request: ItemRequest, stallCheckIntervalMs: number = 500) {
        this.request = request;

        // Start watching for stalls
        this.watcher = setInterval(() => {
            // Check to see if the request is complete, if it is we need to stop
            // checking
            if (this.allDone()) {
                clearInterval(this.watcher)
            }

            // Get the current time
            var now = new Date();

            // Loop over all results and check for stalls
            this.responders.forEach((responder) => {
                if (typeof responder.nextStatusTime != 'undefined') {
                    if (responder.nextStatusTime < now) {
                        // This means that the responder has stalled
                        responder.status = ResponderStatus.Stalled
                    }
                }
            })
        }, stallCheckIntervalMs)
    }

    // Return the count of items with a given status
    private countOfStatus(status: ResponderStatus): number {
        var x = 0;

        this.responders.forEach((v) => {
            if (v.status == status) {
                x++
            }
        })

        return x;
    }

    // Returns the number of responder still working
    numWorking(): number {
        return this.countOfStatus(ResponderStatus.Working);
    }

    // Returns the number of stalled responders
    numStalled(): number {
        return this.countOfStatus(ResponderStatus.Stalled);
    }

    // Returns the number of complete responders
    numComplete(): number {
        return this.countOfStatus(ResponderStatus.Complete);
    }

    // Returns the number of failed responders
    numFailed(): number {
        return this.countOfStatus(ResponderStatus.Failed);
    }

    // Returns the total number of responders for the query
    numResponders(): number {
        return this.responders.size;
    }

    // Returns true if all responders are done or stalled
    allDone(): boolean {
        if (this.numResponders() > 0 && this.inFlight == 0) {
            return (this.numWorking() == 0)
        }

        return false
    }

    // Waits for all to be completed, then returns. A timeout can be supplied
    // which means that the function will return after the set timeout of no
    // responses have been received. Returns a string containing either
    // "timeout" or "done"
    async waitForCompletion(timeoutMs: number = 3000): Promise<string> {
        // How often to check for done-ness
        const doneCheckIntervalMs = 100;
        const stallCheckIntervalMs = 500;

        // Create the timeout promise
        const timeout = new Promise<string>(resolve => setTimeout(resolve, timeoutMs, "timeout"));

        // Create the done promise
        const done = new Promise<string>(resolve => {
            setInterval(() => {
                if (this.allDone()) {
                    resolve("done");
                }
            }, doneCheckIntervalMs, resolve)
        })

        return Promise.race([timeout, done]);
    }

    // Processes a response and updates tracking of responders. Note that the
    // SDP protocol is not currently capable of sending an error as a response.
    // The response is "DONE" then the error is sent on a different subject.
    // This means that we need to process errors also
    processResponse(response: Response): void {
        this.inFlight++

        // Pull details out of the response
        const context = response.getContext();
        var status: ResponderStatus;
        var nextUpdateTime: Date | undefined = undefined;

        // Map states
        switch(response.getState()) {
            case Response.ResponseState.COMPLETE: {
                status = ResponderStatus.Complete;
                break;
            }
            case Response.ResponseState.WORKING: {
                status = ResponderStatus.Working;
                break;
            }
        }

        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            var nextUpdateMilliseconds: number = 0;

            // Convert nanoseconds to milliseconds
            nextUpdateMilliseconds = nextUpdateIn.getNanos() / 1000000

            // Convert seconds to milliseconds and add
            nextUpdateMilliseconds = nextUpdateMilliseconds + (nextUpdateIn.getSeconds() * 1000)

            // Create a new date object representing the date that the update is
            // expected by
            var now = new Date();
            nextUpdateTime = new Date(now.getTime() + nextUpdateMilliseconds);
        }

        // Now actually start processing...

        // Get the responder or create a new one
        var responder = this.responders.get(context) || new Responder(context);

        // Set properties from the response
        responder.status = status;
        responder.nextStatusTime = nextUpdateTime;

        // Save the value
        this.responders.set(context, responder);

        this.inFlight--
    }

    processError(error: ItemRequestError): void {
        this.inFlight++

        const context = error.getContext();
        var responder = this.responders.get(context) || new Responder(context);

        responder.status = ResponderStatus.Failed;
        responder.nextStatusTime = undefined;
        responder.error = error.getErrorstring();

        this.inFlight--
    }
}