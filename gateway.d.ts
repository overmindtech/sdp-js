/// <reference types="node" />
import { GatewayRequest, GatewayRequestStatus } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import * as WS from 'ws';
import { ItemRequestError } from "./responses_pb";
declare type ErrorCallback = (error: string) => void;
declare type NewItemCallback = (item: Item) => void;
declare type NewEdgeCallback = (edge: Edge) => void;
declare type ItemRequestErrorCallback = (error: ItemRequestError) => void;
declare type NewStatusCallback = (status: GatewayRequestStatus) => void;
export declare class GatewaySession {
    _socket: WS.WebSocket;
    ready: Promise<void>;
    status?: GatewayRequestStatus.AsObject;
    _newItemCallbacks: NewItemCallback[];
    _newEdgeCallbacks: NewEdgeCallback[];
    _errorCallbacks: ErrorCallback[];
    _itemRequestErrorCallbacks: ItemRequestErrorCallback[];
    _newStatusCallbacks: NewStatusCallback[];
    constructor(url: string);
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: Buffer): any;
    /**
    * Process incoming error messages
    * @param error The error
    */
    _processError(error: string): void;
    /**
    * Process incoming items
    * @param item The item
    */
    _processNewItem(item: Item): void;
    /**
    * Process incoming edges
    * @param edge The edge
    */
    _processNewEdge(edge: Edge): void;
    /**
    * Process incoming item request errors
    * @param error The error
    */
    _processNewItemRequestError(error: ItemRequestError): void;
    /**
    * Process incoming status messages
    * @param status The status
    */
    _processStatus(status: GatewayRequestStatus): void;
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request: GatewayRequest): void;
    /**
    * Register a callback that is called when the gateway returns an error
    * running a request. These are arrors from the gateway itself which mean
    * the request couldn't be executed as opoosed to error like "not found"
    * that come from responders
    * @param cb The callback
    * @returns This object
    */
    onError(cb: ErrorCallback): this;
    /**
    * Register a callback that is called when a new item is found
    * @param cb The callback
    * @returns This object
    */
    onNewItem(cb: NewItemCallback): this;
    /**
    * Register a callback that will be called when a new edge is found. Edges
    * will only be sen *after* both the source and target of the edge have been
    * sent
    * @param cb The callback
    * @returns This object
    */
    onNewEdge(cb: NewEdgeCallback): this;
    /**
    * Register a callback that is called when an item request error is
    * encoutered. It is up to the user to detemine what to do about these
    * errors as their importance will likely depend on the context of what is
    * being executed
    * @param cb The callback
    * @returns This object
    */
    onNewItemRequestError(cb: ItemRequestErrorCallback): this;
    /**
    * Register a callback that is called when a new status updates is received.
    * The status can also be checked at any time with the `#status` method
    * @param cb The callback
    * @returns This object
    */
    onStatus(cb: NewStatusCallback): this;
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
export {};
//# sourceMappingURL=gateway.d.ts.map