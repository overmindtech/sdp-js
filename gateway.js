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
const node_events_1 = require("node:events");
class GatewaySession extends node_events_1.EventEmitter {
    constructor(url) {
        super();
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
            this.emit('error', response.getError());
        }
        else if (response.hasNewitem()) {
            const item = response.getNewitem();
            if (typeof item != 'undefined') {
                this.emit('new-item', item);
            }
        }
        else if (response.hasNewedge()) {
            const edge = response.getNewedge();
            if (typeof edge != 'undefined') {
                this.emit('new-edge', edge);
            }
        }
        else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror();
            if (typeof e != 'undefined') {
                this.emit('item-request-error', e);
            }
        }
        else if (response.hasStatus()) {
            const status = response.getStatus();
            if (typeof status != 'undefined') {
                this.emit('status', status);
            }
        }
    }
    on(eventName, listener) {
        return super.on(eventName, listener);
    }
    addListener(eventName, listener) {
        return super.addListener(eventName, listener);
    }
    once(eventName, listener) {
        return super.once(eventName, listener);
    }
    off(eventName, listener) {
        return super.off(eventName, listener);
    }
    removeListener(eventName, listener) {
        return super.removeListener(eventName, listener);
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