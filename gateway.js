"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySession = void 0;
const gateway_pb_1 = require("./gateway_pb");
const WS = __importStar(require("ws"));
class GatewaySession {
    constructor(url) {
        // Callback Storage
        this._newItemCallbacks = [];
        this._newEdgeCallbacks = [];
        this._errorCallbacks = [];
        this._itemRequestErrorCallbacks = [];
        this._newStatusCallbacks = [];
        this._socket = new WS.WebSocket(url);
        this.ready = new Promise((resolve, reject) => {
            this._socket.on('open', () => {
                resolve();
            });
            this._socket.on('error', (err) => {
                reject(err);
            });
        });
        this._socket.on('message', (data, isBinary) => {
            if (isBinary) {
                if ('buffer' in data) {
                    this._processMessage(data);
                }
                else {
                    throw new Error(`Unexected data: ${data}`);
                }
            }
            else {
                throw new Error('Reveived non-binary message on websocket');
            }
        });
    }
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer) {
        const response = gateway_pb_1.GatewayResponse.deserializeBinary(buffer);
        if (response.hasError()) {
            this._processError(response.getError());
        }
        else if (response.hasNewitem()) {
            const item = response.getNewitem();
            if (typeof item != 'undefined') {
                this._processNewItem(item);
            }
        }
        else if (response.hasNewedge()) {
            const edge = response.getNewedge();
            if (typeof edge != 'undefined') {
                this._processNewEdge(edge);
            }
        }
        else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror();
            if (typeof e != 'undefined') {
                this._processNewItemRequestError(e);
            }
        }
        else if (response.hasStatus()) {
            const status = response.getStatus();
            if (typeof status != 'undefined') {
                this._processStatus(status);
            }
        }
    }
    /**
    * Process incoming error messages
    * @param error The error
    */
    _processError(error) {
        for (let cb of this._errorCallbacks) {
            cb(error);
        }
    }
    /**
    * Process incoming items
    * @param item The item
    */
    _processNewItem(item) {
        for (let cb of this._newItemCallbacks) {
            cb(item);
        }
    }
    /**
    * Process incoming edges
    * @param edge The edge
    */
    _processNewEdge(edge) {
        for (let cb of this._newEdgeCallbacks) {
            cb(edge);
        }
    }
    /**
    * Process incoming item request errors
    * @param error The error
    */
    _processNewItemRequestError(error) {
        for (let cb of this._itemRequestErrorCallbacks) {
            cb(error);
        }
    }
    /**
    * Process incoming status messages
    * @param status The status
    */
    _processStatus(status) {
        this.status = status.toObject();
        for (let cb of this._newStatusCallbacks) {
            cb(status);
        }
    }
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request) {
        var binary = request.serializeBinary();
        this._socket.send(binary, {
            binary: true,
        });
    }
    /**
    * Register a callback that is called when the gateway returns an error
    * running a request. These are arrors from the gateway itself which mean
    * the request couldn't be executed as opoosed to error like "not found"
    * that come from responders
    * @param cb The callback
    * @returns This object
    */
    onError(cb) {
        this._errorCallbacks.push(cb);
        return this;
    }
    /**
    * Register a callback that is called when a new item is found
    * @param cb The callback
    * @returns This object
    */
    onNewItem(cb) {
        this._newItemCallbacks.push(cb);
        return this;
    }
    /**
    * Register a callback that will be called when a new edge is found. Edges
    * will only be sen *after* both the source and target of the edge have been
    * sent
    * @param cb The callback
    * @returns This object
    */
    onNewEdge(cb) {
        this._newEdgeCallbacks.push(cb);
        return this;
    }
    /**
    * Register a callback that is called when an item request error is
    * encoutered. It is up to the user to detemine what to do about these
    * errors as their importance will likely depend on the context of what is
    * being executed
    * @param cb The callback
    * @returns This object
    */
    onNewItemRequestError(cb) {
        this._itemRequestErrorCallbacks.push(cb);
        return this;
    }
    /**
    * Register a callback that is called when a new status updates is received.
    * The status can also be checked at any time with the `#status` method
    * @param cb The callback
    * @returns This object
    */
    onStatus(cb) {
        this._newStatusCallbacks.push(cb);
        return this;
    }
    /**
    * Closes the session
    */
    close() {
        this._socket.close();
    }
    /**
    *
    * @returns The current state of the websocket connection
    */
    state() {
        return this._socket.readyState;
    }
}
exports.GatewaySession = GatewaySession;
//# sourceMappingURL=gateway.js.map