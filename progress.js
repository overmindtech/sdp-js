"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProgress = exports.Responder = exports.ResponderStatus = void 0;
var responses_pb_1 = require("./responses_pb");
// The status of a given responder
var ResponderStatus;
(function (ResponderStatus) {
    ResponderStatus[ResponderStatus["Working"] = 0] = "Working";
    ResponderStatus[ResponderStatus["Stalled"] = 1] = "Stalled";
    ResponderStatus[ResponderStatus["Complete"] = 2] = "Complete";
    ResponderStatus[ResponderStatus["Failed"] = 3] = "Failed";
})(ResponderStatus = exports.ResponderStatus || (exports.ResponderStatus = {}));
// Represents something that is responding to our query
var Responder = /** @class */ (function () {
    function Responder(context) {
        this.context = "";
        this.lastStatusTime = new Date();
        this.error = "";
        this._lastStatus = ResponderStatus.Complete;
        this.context = context;
        this.status = ResponderStatus.Working;
    }
    Object.defineProperty(Responder.prototype, "status", {
        // Get the last status of this responder
        get: function () {
            return this._lastStatus;
        },
        // Sets the status and updates the LastStatus to the current time
        set: function (status) {
            // Set last status time to now
            this.lastStatusTime = new Date();
            this._lastStatus = status;
        },
        enumerable: false,
        configurable: true
    });
    return Responder;
}());
exports.Responder = Responder;
var RequestProgress = /** @class */ (function () {
    function RequestProgress(request) {
        this.responders = new Map();
        this.request = request;
    }
    // Return the count of items with a given status
    RequestProgress.prototype.countOfStatus = function (status) {
        var x = 0;
        this.responders.forEach(function (v) {
            if (v.status == status) {
                x++;
            }
        });
        return x;
    };
    // Returns the number of responder still working
    RequestProgress.prototype.numWorking = function () {
        return this.countOfStatus(ResponderStatus.Working);
    };
    // Returns the number of stalled responders
    RequestProgress.prototype.numStalled = function () {
        return this.countOfStatus(ResponderStatus.Stalled);
    };
    // Returns the number of complete responders
    RequestProgress.prototype.numComplete = function () {
        return this.countOfStatus(ResponderStatus.Complete);
    };
    // Returns the number of failed responders
    RequestProgress.prototype.numFailed = function () {
        return this.countOfStatus(ResponderStatus.Failed);
    };
    // Returns the total number of responders for the query
    RequestProgress.prototype.numResponders = function () {
        return this.responders.size;
    };
    // Returns true if all responders are done or stalled
    RequestProgress.prototype.allDone = function () {
        if (this.numResponders() > 0) {
            return (this.numWorking() == 0);
        }
        return false;
    };
    // Processes a response and updates tracking of responders. Note that the
    // SDP protocol is not currently capable of sending an error as a response.
    // The response is "DONE" then the error is sent on a different subject.
    // This means that we need to process errors also
    RequestProgress.prototype.processResponse = function (response) {
        // Pull details out of the response
        var context = response.getContext();
        var status;
        var nextUpdateTime = undefined;
        // Map states
        switch (response.getState()) {
            case responses_pb_1.Response.ResponseState.COMPLETE: {
                status = ResponderStatus.Complete;
                break;
            }
            case responses_pb_1.Response.ResponseState.WORKING: {
                status = ResponderStatus.Working;
                break;
            }
        }
        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            var nextUpdateMilliseconds = 0;
            // Convert nanoseconds to milliseconds
            nextUpdateMilliseconds = nextUpdateIn.getNanos() / 1000000;
            // Convert seconds to milliseconds and add
            nextUpdateMilliseconds = nextUpdateMilliseconds + (nextUpdateIn.getSeconds() * 1000);
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
    };
    RequestProgress.prototype.processError = function (error) {
        var context = error.getContext();
        var responder = this.responders.get(context) || new Responder(context);
        responder.status = ResponderStatus.Failed;
        responder.nextStatusTime = undefined;
        responder.error = error.getErrorstring();
    };
    return RequestProgress;
}());
exports.RequestProgress = RequestProgress;
//# sourceMappingURL=progress.js.map