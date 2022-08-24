import { GatewayRequest } from "./gateway_pb";
import * as WS from 'ws';

export class GatewaySession {
    _socket: WS.WebSocket
    ready: Promise<void>

    constructor(url: string) {
        this._socket = new WS.WebSocket(url);

        this.ready = new Promise((resolve, reject) => {
            this._socket.on('open', () => {
                resolve();
            })

            this._socket.on('error', (err) => {
                reject(err);
            })
        })
    
        this._socket.onmessage = this._processMessage
    }

    /**
     * Processing inbound messages
     * @param ev 
     */
    _processMessage(ev: WS.MessageEvent): any {
        console.log(ev)
    }

    /**
     * Sends a request to the gateway
     * @param request The request to send
     */
    sendRequest(request: GatewayRequest) {
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
    state(): typeof WS.CONNECTING | typeof WS.OPEN | typeof WS.CLOSING | typeof WS.CLOSED {
        return this._socket.readyState;
    }
}