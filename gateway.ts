import { GatewayRequest, GatewayRequestStatus, GatewayResponse } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import * as WS from 'ws';
import { ItemRequestError } from "./responses_pb";
import { EventEmitter } from "node:events";

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
                    throw new Error(`Unexected data: ${data}`)
                }
            } else {
                throw new Error('Reveived non-binary message on websocket')
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

    on(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    on(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    on(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    on(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    on(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    on(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.on(eventName, listener);
    }

    addListener(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    addListener(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    addListener(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    addListener(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    addListener(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.addListener(eventName, listener);
    }

    once(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    once(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    once(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    once(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    once(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    once(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.once(eventName, listener);
    }

    off(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    off(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    off(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    off(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    off(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
    off(eventName: string | symbol, listener: (...args: any[]) => void): this {
        return super.off(eventName, listener)
    }

    removeListener(eventName: 'error', listener: (this: GatewaySession, error: string) => void): this;
    removeListener(eventName: 'new-item', listener: (this: GatewaySession, item: Item) => void): this;
    removeListener(eventName: 'new-edge', listener: (this: GatewaySession, edge: Edge) => void): this;
    removeListener(eventName: 'item-request-error', listener: (this: GatewaySession, error: ItemRequestError) => void): this;
    removeListener(eventName: 'status', listener: (this: GatewaySession, status: GatewayRequestStatus) => void): this;
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