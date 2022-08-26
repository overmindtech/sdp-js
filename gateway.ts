import { GatewayRequest, GatewayRequestStatus, GatewayResponse } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import { ItemRequestError } from "./responses_pb";
import { EventEmitter } from "node:events";
import * as WS from 'ws';

export class GatewaySession extends EventEmitter {
    _socket: WS.WebSocket
    ready: Promise<void>
    status?: GatewayRequestStatus.AsObject
    
    constructor(url: string) {
        super();

        this._socket = new WS.WebSocket(url);
        
        this.ready = new Promise((resolve, reject) => {
            this._socket.on('open', () => {
                resolve();
            })
            
            this._socket.on('error', (err) => {
                reject(err);
            })
        })
        
        this._socket.on('message', (data, isBinary) => {
            if (isBinary) {
                if ('buffer' in data) {
                    this._processMessage(data);
                } else {
                    throw new Error(`Unexpected data: ${data}`)
                }
            } else {
                throw new Error('Received non-binary message on websocket')
            }
        })
    }
    
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: Buffer): any {
        const response = GatewayResponse.deserializeBinary(buffer)
        
        if (response.hasError()) {
            this.emit('error', response.getError());
        } else if (response.hasNewitem()) {
            const item = response.getNewitem()
            
            if (typeof item != 'undefined') {
                this.emit('new-item', item);
            }
        } else if (response.hasNewedge()) {
            const edge = response.getNewedge()
            
            if (typeof edge != 'undefined') {
                this.emit('new-edge', edge);
            }
        } else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror()
            
            if (typeof e != 'undefined') {
                this.emit('item-request-error', e);
            }
        } else if (response.hasStatus()) {
            const status = response.getStatus();
            
            if (typeof status != 'undefined') {
                this.status = status.toObject();

                this.emit('status', status);
            }
        }
    }

    // TODO: I should really find some good place to document the types of
    // events (other than the type definitions here)

    on(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    on(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    on(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    on(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    on(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(eventName, listener);
    }

    addListener(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    addListener(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    addListener(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    addListener(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    addListener(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.addListener(eventName, listener);
    }

    once(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    once(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    once(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    once(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    once(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.once(eventName, listener);
    }

    off(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    off(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    off(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    off(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    off(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.off(eventName, listener)
    }

    removeListener(eventName: typeof GatewaySession.ErrorEvent, listener: (this: GatewaySession, error: string) => void): this;
    removeListener(eventName: typeof GatewaySession.NewItemEvent, listener: (this: GatewaySession, item: Item) => void): this;
    removeListener(eventName: typeof GatewaySession.NewEdgeEvent, listener: (this: GatewaySession, edge: Edge) => void): this;
    removeListener(eventName: typeof GatewaySession.NewItemRequestErrorEvent, listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    removeListener(eventName: typeof GatewaySession.StatusEvent, listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.removeListener(eventName, listener)
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
    state(): typeof WS.CONNECTING | typeof WS.OPEN | typeof WS.CLOSING | typeof WS.CLOSED {
        return this._socket.readyState;
    }
}

export namespace GatewaySession {
    // Here I'm storing the event types so that they have some central documentation. This means that I can document the event types without having to rewrite it for each `on`, `off` etc.

    /**
     * An error event is sent when the gateway itself encounters an error when
     * running the request. An error here means that the request wasn't started
     */
    export const ErrorEvent = 'error'

    /**
     * Ths event is sent when a new item is discovered as a result of the
     * queries that have been started during the session
     */
    export const NewItemEvent = 'new-item'

    /**
     * This event is sent when a new edge between two items is discovered. Note
     * that edges will only be sent after both items have been sent, so an edge
     * should never refer to a non-existent item
     */
    export const NewEdgeEvent = 'new-edge'

    /**
     * This event means that an error was encountered by one of the responders
     * when responding to the request. This could indicate a failure, or might
     * be expected. It s up to the user to determine how these errors should be
     * surfaced and handled
     */
    export const NewItemRequestErrorEvent = 'item-request-error'

    /**
     * Status events are sent at an interval determined in the `GatewayRequest`,
     * subsequent gateway requests will update the interval. If the status has
     * not changed since the last interval elapsed, nothing will be sent
     */
    export const StatusEvent = 'status'
}
