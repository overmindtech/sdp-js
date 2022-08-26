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
const node_events_1 = require("node:events");
const WS = __importStar(require("ws"));
class GatewaySession extends node_events_1.EventEmitter {
    constructor(url) {
        super();
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
                    throw new Error(`Unexpected data: ${data}`);
                }
            }
            else {
                throw new Error('Received non-binary message on websocket');
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
                this.status = status.toObject();
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
(function (GatewaySession) {
    // Here I'm storing the event types so that they have some central documentation. This means that I can document the event types without having to rewrite it for each `on`, `off` etc.
    /**
     * An error event is sent when the gateway itself encounters an error when
     * running the request. An error here means that the request wasn't started
     */
    GatewaySession.ErrorEvent = 'error';
    /**
     * Ths event is sent when a new item is discovered as a result of the
     * queries that have been started during the session
     */
    GatewaySession.NewItemEvent = 'new-item';
    /**
     * This event is sent when a new edge between two items is discovered. Note
     * that edges will only be sent after both items have been sent, so an edge
     * should never refer to a non-existent item
     */
    GatewaySession.NewEdgeEvent = 'new-edge';
    /**
     * This event means that an error was encountered by one of the responders
     * when responding to the request. This could indicate a failure, or might
     * be expected. It s up to the user to determine how these errors should be
     * surfaced and handled
     */
    GatewaySession.NewItemRequestErrorEvent = 'item-request-error';
    /**
     * Status events are sent at an interval determined in the `GatewayRequest`,
     * subsequent gateway requests will update the interval. If the status has
     * not changed since the last interval elapsed, nothing will be sent
     */
    GatewaySession.StatusEvent = 'status';
})(GatewaySession = exports.GatewaySession || (exports.GatewaySession = {}));
//# sourceMappingURL=gateway.js.map