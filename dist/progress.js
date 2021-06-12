"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestProgress = exports.Responder = exports.ResponderStatus = void 0;
var _1 = require(".");
var responses_pb_1 = require("./dist/responses_pb");
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
        this.lastStatus = ResponderStatus.Working;
    }
    Object.defineProperty(Responder.prototype, "lastStatus", {
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
    RequestProgress.prototype.processResponse = function (response) {
        // Pull details out of the response
        var context = response.getContext();
        var state;
        var nextUpdateTime = undefined;
        // Map states
        switch (response.getState()) {
            case responses_pb_1.Response.ResponseState.COMPLETE: {
                state = ResponderStatus.Complete;
                break;
            }
            case responses_pb_1.Response.ResponseState.WORKING: {
                state = ResponderStatus.Working;
                break;
            }
        }
        // If there is a next update time the calculate it
        var nextUpdateIn = response.getNextupdatein();
        if (typeof nextUpdateIn != 'undefined') {
            _1.Util.toDate(nextUpdateIn);
        }
        var responder = this.responders.get(context);
        if (typeof responder == 'undefined') {
            // If the responder iss undefined then we need to create one
            responder = new Responder(context);
            // responder.lastStatus =
        }
        else {
            // Update the responder
        }
    };
    return RequestProgress;
}());
exports.RequestProgress = RequestProgress;
//# sourceMappingURL=progress.js.map