/// <reference types="node" />
import { GatewayRequest, GatewayRequestStatus } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import { ItemRequestError } from "./responses_pb";
interface CustomEventListener<T> {
    (evt: CustomEvent<T>): void;
}
interface CustomEventListenerObject<T> {
    handleEvent(object: CustomEvent<T>): void;
}
declare type CustomEventListenerOrEventListenerObject<T> = CustomEventListener<T> | CustomEventListenerObject<T>;
export declare class GatewaySession extends EventTarget {
    _socket: WebSocket;
    ready: Promise<void>;
    status?: GatewayRequestStatus.AsObject;
    constructor(url: string);
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: Buffer): any;
    addEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    addEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void;
    removeEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void;
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
    state(): typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED;
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
export {};
//# sourceMappingURL=gateway.d.ts.map