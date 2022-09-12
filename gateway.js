"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaySession = void 0;
const gateway_pb_1 = require("./gateway_pb");
class GatewaySession extends EventTarget {
    constructor(url) {
        super();
        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer";
        this.ready = new Promise((resolve, reject) => {
            this.socket.onopen = () => {
                resolve();
            };
            this.socket.onerror = (err) => {
                reject(err);
            };
        });
        this.socket.addEventListener("message", (ev) => {
            this._processMessage(ev.data);
        });
    }
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer) {
        const binary = new Uint8Array(buffer);
        const response = gateway_pb_1.GatewayResponse.deserializeBinary(binary);
        if (response.hasError()) {
            this.dispatchEvent(new CustomEvent(GatewaySession.ErrorEvent, {
                detail: response.getError()
            }));
        }
        else if (response.hasNewitem()) {
            const item = response.getNewitem();
            if (typeof item != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewItemEvent, {
                    detail: item,
                }));
            }
        }
        else if (response.hasNewedge()) {
            const edge = response.getNewedge();
            if (typeof edge != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewEdgeEvent, {
                    detail: edge,
                }));
            }
        }
        else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror();
            if (typeof e != 'undefined') {
                this.dispatchEvent(new CustomEvent(GatewaySession.NewItemRequestErrorEvent, {
                    detail: e,
                }));
            }
        }
        else if (response.hasStatus()) {
            const status = response.getStatus();
            if (typeof status != 'undefined') {
                this.status = status.toObject();
                this.dispatchEvent(new CustomEvent(GatewaySession.StatusEvent, {
                    detail: status,
                }));
            }
        }
    }
    addEventListener(type, callback, options) {
        super.addEventListener(type, callback, options);
    }
    removeEventListener(type, callback, options) {
        super.removeEventListener(type, callback, options);
    }
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request) {
        var binary = request.serializeBinary();
        this.socket.send(binary);
    }
    /**
    * Closes the session
    */
    close() {
        this.socket.close();
    }
    /**
    *
    * @returns The current state of the websocket connection
    */
    state() {
        return this.socket.readyState;
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