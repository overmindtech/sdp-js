"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    function RequestProgress(request, stallCheckIntervalMs) {
        var _this = this;
        if (stallCheckIntervalMs === void 0) { stallCheckIntervalMs = 500; }
        this.responders = new Map();
        // Tracks the number of things currently being processed so that we can be
        // sure that all processing is complete before returning
        this.inFlight = 0;
        this.request = request;
        // Start watching for stalls
        this.watcher = setInterval(function () {
            // Check to see if the request is complete, if it is we need to stop
            // checking
            if (_this.allDone()) {
                clearInterval(_this.watcher);
            }
            // Get the current time
            var now = new Date();
            // Loop over all results and check for stalls
            _this.responders.forEach(function (responder) {
                if (typeof responder.nextStatusTime != 'undefined') {
                    if (responder.nextStatusTime < now) {
                        // This means that the responder has stalled
                        responder.status = ResponderStatus.Stalled;
                    }
                }
            });
        }, stallCheckIntervalMs);
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
    // Cancels loops that are watching for stalls
    RequestProgress.prototype.cancel = function () {
        clearInterval(this.watcher);
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
        if (this.numResponders() > 0 && this.inFlight == 0) {
            return (this.numWorking() == 0);
        }
        return false;
    };
    // percentComplete Returns a number between 1 and 100 representing the
    // percentage complete of all responders.
    RequestProgress.prototype.percentComplete = function () {
        return (this.numComplete() / this.numResponders()) * 100;
    };
    // Waits for all to be completed, then returns. A timeout can be supplied
    // which means that the function will return after the set timeout of no
    // responses have been received. Returns a string containing either
    // "timeout" or "done"
    RequestProgress.prototype.waitForCompletion = function (timeoutMs) {
        if (timeoutMs === void 0) { timeoutMs = 3000; }
        return __awaiter(this, void 0, void 0, function () {
            var doneCheckIntervalMs, doneChecker, timeout;
            var _this = this;
            return __generator(this, function (_a) {
                doneCheckIntervalMs = 100;
                timeout = new Promise(function (resolve) { return setTimeout(resolve, timeoutMs, "timeout"); });
                // Create the done promise
                return [2 /*return*/, new Promise(function (resolve) {
                        doneChecker = setInterval(function () {
                            if (_this.allDone()) {
                                clearInterval(doneChecker);
                                resolve("done");
                            }
                        }, doneCheckIntervalMs, resolve);
                        timeout.then(function () {
                            clearInterval(doneChecker);
                            resolve("timeout");
                        });
                    })];
            });
        });
    };
    // Processes a response and updates tracking of responders. Note that the
    // SDP protocol is not currently capable of sending an error as a response.
    // The response is "DONE" then the error is sent on a different subject.
    // This means that we need to process errors also
    RequestProgress.prototype.processResponse = function (response) {
        this.inFlight++;
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
        this.inFlight--;
    };
    RequestProgress.prototype.processError = function (error) {
        this.inFlight++;
        var context = error.getContext();
        var responder = this.responders.get(context) || new Responder(context);
        responder.status = ResponderStatus.Failed;
        responder.nextStatusTime = undefined;
        responder.error = error.getErrorstring();
        this.inFlight--;
    };
    return RequestProgress;
}());
exports.RequestProgress = RequestProgress;
//# sourceMappingURL=progress.js.map