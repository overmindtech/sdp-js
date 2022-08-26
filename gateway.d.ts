/// <reference types="node" />
/// <reference types="node" />
import { GatewayRequest, GatewayRequestStatus } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import { ItemRequestError } from "./responses_pb";
import { EventEmitter } from "node:events";
import * as WS from 'ws';
export declare class GatewaySession extends EventEmitter {
    _socket: WS.WebSocket;
    ready: Promise<void>;
    status?: GatewayRequestStatus.AsObject;
    constructor(url: string);
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: Buffer): any;
    on(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    on(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    on(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    on(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    on(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    addListener(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    addListener(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    addListener(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    addListener(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    addListener(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    once(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    once(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    once(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    once(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    once(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    off(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    off(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    off(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    off(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    off(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    removeListener(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    removeListener(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    removeListener(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    removeListener(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    removeListener(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request: GatewayRequest): void;
    /**
    * Closes the session
    */
    close(): void;
    /**
    *
    * @returns The current state of the websocket connection
    */
    state(): typeof WS.CONNECTING | typeof WS.OPEN | typeof WS.CLOSING | typeof WS.CLOSED;
}
export declare namespace GatewaySession {
    /**
     * An error event is sent when the gateway itself encounters an error when
     * running the request. An error here means that the request wasn't started
     */
    const ErrorEvent = "error";
    /**
     * Ths event is sent when a new item is discovered as a result of the
     * queries that have been started during the session
     */
    const NewItemEvent = "new-item";
    /**
     * This event is sent when a new edge between two items is discovered. Note
     * that edges will only be sent after both items have been sent, so an edge
     * should never refer to a non-existent item
     */
    const NewEdgeEvent = "new-edge";
    /**
     * This event means that an error was encountered by one of the responders
     * when responding to the request. This could indicate a failure, or might
     * be expected. It s up to the user to determine how these errors should be
     * surfaced and handled
     */
    const NewItemRequestErrorEvent = "item-request-error";
    /**
     * Status events are sent at an interval determined in the `GatewayRequest`,
     * subsequent gateway requests will update the interval. If the status has
     * not changed since the last interval elapsed, nothing will be sent
     */
    const StatusEvent = "status";
}
//# sourceMappingURL=gateway.d.ts.map