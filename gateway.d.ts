/// <reference types="node" />
/// <reference types="node" />
import { GatewayRequest, GatewayRequestStatus } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import * as WS from 'ws';
import { ItemRequestError } from "./responses_pb";
import { EventEmitter } from "node:events";
declare type ErrorCallback = (error: string) => void;
declare type NewItemCallback = (item: Item) => void;
declare type NewEdgeCallback = (edge: Edge) => void;
declare type ItemRequestErrorCallback = (error: ItemRequestError) => void;
declare type NewStatusCallback = (status: GatewayRequestStatus) => void;
export declare class GatewaySession extends EventEmitter {
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
    on(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    on(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    on(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    on(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    on(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    addListener(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    addListener(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    addListener(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    addListener(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    addListener(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    once(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    once(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    once(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    once(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    once(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    off(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    off(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    off(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    off(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    off(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    removeListener(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    removeListener(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    removeListener(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    removeListener(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    removeListener(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
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
export {};
//# sourceMappingURL=gateway.d.ts.map