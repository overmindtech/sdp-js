import { GatewayRequest } from "./gateway_pb";
import * as WS from 'ws';
export declare class GatewaySession {
    _socket: WS.WebSocket;
    ready: Promise<void>;
    constructor(url: string);
    /**
     * Processing inbound messages
     * @param ev
     */
    _processMessage(ev: WS.MessageEvent): any;
    /**
     * Sends a request to the gateway
     * @param request The request to send
     */
    sendRequest(request: GatewayRequest): void;
    close(): void;
    /**
     *
     * @returns The current state of the websocket connection
     */
    state(): typeof WS.CONNECTING | typeof WS.OPEN | typeof WS.CLOSING | typeof WS.CLOSED;
}
//# sourceMappingURL=gateway.d.ts.map