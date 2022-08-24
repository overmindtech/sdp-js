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
const WS = __importStar(require("ws"));
class GatewaySession {
    constructor(url) {
        this._socket = new WS.WebSocket(url);
        this.ready = new Promise((resolve, reject) => {
            this._socket.on('open', () => {
                resolve();
            });
            this._socket.on('error', (err) => {
                reject(err);
            });
        });
        this._socket.onmessage = this._processMessage;
    }
    /**
     * Processing inbound messages
     * @param ev
     */
    _processMessage(ev) {
        console.log(ev);
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