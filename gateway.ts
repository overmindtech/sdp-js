import { GatewayRequest, GatewayRequestStatus, GatewayResponse } from "./gateway_pb";
import { Edge, Item } from "./items_pb";
import { ItemRequestError } from "./responses_pb";

interface CustomEventListener<T> {
    (evt: CustomEvent<T>): void;
}
interface CustomEventListenerObject<T> {
    handleEvent(object: CustomEvent<T>): void;
}
type CustomEventListenerOrEventListenerObject<T> = CustomEventListener<T> | CustomEventListenerObject<T>;

export class GatewaySession extends EventTarget {
    _socket: WebSocket
    ready: Promise<void>
    status?: GatewayRequestStatus.AsObject
    
    constructor(url: string) {
        super();

        this._socket = new WebSocket(url);
        
        this.ready = new Promise((resolve, reject) => {
            this._socket.onopen = () => {
                resolve();
            }
            
            this._socket.onerror = (err) => {
                reject(err);
            }
        })

        this._socket.onmessage = (ev) => {
            // if (isBinary) {
                if ('buffer' in ev.data) {
                    this._processMessage(ev.data);
                } else {
                    throw new Error(`Unexpected data: ${ev.data}`)
                }
            // } else {
                // throw new Error('Received non-binary message on websocket')
            // }
        }
    }
    
    /**
    * Processing inbound messages
    * @param buffer A buffer containing the binary message
    */
    _processMessage(buffer: Buffer): any {
        const response = GatewayResponse.deserializeBinary(buffer)
        
        if (response.hasError()) {
            this.dispatchEvent(new CustomEvent<string>(GatewaySession.ErrorEvent, {
                detail: response.getError()
            }))
        } else if (response.hasNewitem()) {
            const item = response.getNewitem()
            
            if (typeof item != 'undefined') {
                this.dispatchEvent(new CustomEvent<Item>(GatewaySession.NewItemEvent, {
                    detail: item,
                }))
            }
        } else if (response.hasNewedge()) {
            const edge = response.getNewedge()
            
            if (typeof edge != 'undefined') {
                this.dispatchEvent(new CustomEvent<Edge>(GatewaySession.NewEdgeEvent, {
                    detail: edge,
                }))
            }
        } else if (response.hasNewitemrequesterror()) {
            const e = response.getNewitemrequesterror()
            
            if (typeof e != 'undefined') {
                this.dispatchEvent(new CustomEvent<ItemRequestError>(GatewaySession.NewItemRequestErrorEvent, {
                    detail: e,
                }))
            }
        } else if (response.hasStatus()) {
            const status = response.getStatus();
            
            if (typeof status != 'undefined') {
                this.status = status.toObject();

                this.dispatchEvent(new CustomEvent<GatewayRequestStatus>(GatewaySession.StatusEvent, {
                    detail: status,
                }))

            }
        }
    }

    addEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void
    addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void {
        super.addEventListener(type, callback, options);
    }

    removeEventListener(type: typeof GatewaySession.ErrorEvent, callback: CustomEventListenerOrEventListenerObject<string> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewItemEvent, callback: CustomEventListenerOrEventListenerObject<Item> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewEdgeEvent, callback: CustomEventListenerOrEventListenerObject<Edge> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.NewItemRequestErrorEvent, callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: typeof GatewaySession.StatusEvent, callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null, options?: boolean | AddEventListenerOptions | undefined): void
    removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: boolean | EventListenerOptions | undefined): void {
        super.removeEventListener(type, callback, options);
    }
    
    /**
    * Sends a request to the gateway
    * @param request The request to send
    */
    sendRequest(request: GatewayRequest) {
        var binary = request.serializeBinary();
        this._socket.send(binary);
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
    state(): typeof WebSocket.CONNECTING | typeof WebSocket.OPEN | typeof WebSocket.CLOSING | typeof WebSocket.CLOSED {
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
