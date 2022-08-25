import { GatewayRequest, GatewayRequestStatus, GatewayResponse } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import * as WS from 'ws';
import { ItemRequestError } from "./responses_pb";

type ErrorCallback = (error: string) => void;
type NewItemCallback = (item: Item) => void;
type NewEdgeCallback = (edge: Edge) => void;
type ItemRequestErrorCallback = (error: ItemRequestError) => void;
type NewStatusCallback = (status: GatewayRequestStatus) => void;

export class GatewaySession {
    _socket: WS.WebSocket
    ready: Promise<void>
    status?: GatewayRequestStatus.AsObject
    
    // Callback Storage
    _newItemCallbacks: NewItemCallback[] = [];
    _newEdgeCallbacks: NewEdgeCallback[] = [];
    _errorCallbacks: ErrorCallback[] = [];
    _itemRequestErrorCallbacks: ItemRequestErrorCallback[] = [];
    _newStatusCallbacks: NewStatusCallback[] = [];
    
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
            this._processError(response.getError());
        } else if (response.hasNewitem()) {
            const item = response.getNewitem()
            
            if (typeof item != 'undefined') {
                this._processNewItem(item);
            }
        } else if (response.hasNewedge()) {
            const edge = response.getNewedge()
            
            if (typeof edge != 'undefined') {
                this._processNewEdge(edge);
            }
        } else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror()
            
            if (typeof e != 'undefined') {
                this._processNewItemRequestError(e);
            }
        } else if (response.hasStatus()) {
            const status = response.getStatus()
            
            if (typeof status != 'undefined') {
                this._processStatus(status);
            }
        }
    }
    
    /**
    * Process incoming error messages
    * @param error The error
    */
    _processError(error: string) {
        for (let cb of this._errorCallbacks) {
            cb(error);
        }
    }
    
    /**
    * Process incoming items
    * @param item The item
    */
    _processNewItem(item : Item) {
        for (let cb of this._newItemCallbacks) {
            cb(item);
        }
    }
    
    /**
    * Process incoming edges
    * @param edge The edge
    */
    _processNewEdge(edge: Edge) {
        for (let cb of this._newEdgeCallbacks) {
            cb(edge);
        }
    }
    
    /**
    * Process incoming item request errors
    * @param error The error
    */
    _processNewItemRequestError(error: ItemRequestError) {
        for (let cb of this._itemRequestErrorCallbacks) {
            cb(error);
        }
    }
    
    /**
    * Process incoming status messages
    * @param status The status
    */
    _processStatus(status: GatewayRequestStatus) {
        this.status = status.toObject();
        
        for (let cb of this._newStatusCallbacks) {
            cb(status);
        }
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
    * Register a callback that is called when the gateway returns an error
    * running a request. These are arrors from the gateway itself which mean
    * the request couldn't be executed as opoosed to error like "not found"
    * that come from responders
    * @param cb The callback
    * @returns This object
    */
    onError(cb: ErrorCallback): this {
        this._errorCallbacks.push(cb);
        return this;
    }
    
    /**
    * Register a callback that is called when a new item is found
    * @param cb The callback
    * @returns This object
    */
    onNewItem(cb: NewItemCallback): this {
        this._newItemCallbacks.push(cb);
        return this;
    }
    
    /**
    * Register a callback that will be called when a new edge is found. Edges
    * will only be sen *after* both the source and target of the edge have been
    * sent
    * @param cb The callback
    * @returns This object
    */
    onNewEdge(cb: NewEdgeCallback): this {
        this._newEdgeCallbacks.push(cb);
        return this;
    }
    
    /**
    * Register a callback that is called when an item request error is
    * encoutered. It is up to the user to detemine what to do about these
    * errors as their importance will likely depend on the context of what is
    * being executed
    * @param cb The callback
    * @returns This object
    */
    onNewItemRequestError(cb: ItemRequestErrorCallback): this {
        this._itemRequestErrorCallbacks.push(cb);
        return this;
    }
    
    /**
    * Register a callback that is called when a new status updates is received.
    * The status can also be checked at any time with the `#status` method
    * @param cb The callback
    * @returns This object
    */
    onStatus(cb: NewStatusCallback): this {
        this._newStatusCallbacks.push(cb);
        return this;
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