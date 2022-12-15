import {
  SocketErrorEvent,
  NewItemEvent,
  NewEdgeEvent,
  NewItemRequestErrorEvent,
  StatusEvent,
  ErrorEvent,
  CloseEvent,
} from './Events'
import {
  Edge,
  GatewayRequest,
  GatewayRequestStatus,
  GatewayResponse,
  Item,
  ItemRequestError,
} from './__generated__/'

interface CustomEventListener<T> {
  (evt: CustomEvent<T>): void
}
interface CustomEventListenerObject<T> {
  handleEvent(object: CustomEvent<T>): void
}
type CustomEventListenerOrEventListenerObject<T> =
  | CustomEventListener<T>
  | CustomEventListenerObject<T>

export class GatewaySession extends EventTarget {
  private socket: WebSocket
  ready: Promise<void>
  status?: GatewayRequestStatus.AsObject

  constructor(url: string) {
    super()

    this.socket = new WebSocket(url)
    this.socket.binaryType = 'arraybuffer'

    this.ready = new Promise((resolve, reject) => {
      const rejecter = (event: Event) => {
        reject(event)
      }

      this.socket.addEventListener('error', rejecter, { once: true })
      this.socket.addEventListener(
        'open',
        () => {
          this.removeEventListener('error', rejecter)
          resolve()
        },
        { once: true }
      )
    })

    this.socket.addEventListener('error', (event) => {
      this.dispatchEvent(
        new CustomEvent<Event>(SocketErrorEvent, {
          detail: event,
        })
      )
    })

    this.socket.addEventListener('close', (closeEvent) => {
      this.dispatchEvent(
        new CustomEvent<CloseEvent>(CloseEvent, {
          detail: closeEvent,
        })
      )
    })

    this.socket.addEventListener('message', (ev: MessageEvent<ArrayBuffer>) => {
      this._processMessage(ev.data)
    })
  }

  /**
   * Processing inbound messages
   * @param buffer A buffer containing the binary message
   */
  _processMessage(buffer: ArrayBuffer) {
    const binary = new Uint8Array(buffer)
    const response = GatewayResponse.deserializeBinary(binary)

    if (response.hasError()) {
      this.dispatchEvent(
        new CustomEvent<string>(ErrorEvent, {
          detail: response.getError(),
        })
      )
    } else if (response.hasNewitem()) {
      const item = response.getNewitem()

      if (typeof item != 'undefined') {
        this.dispatchEvent(
          new CustomEvent<Item>(NewItemEvent, {
            detail: item,
          })
        )
      }
    } else if (response.hasNewedge()) {
      const edge = response.getNewedge()

      if (typeof edge != 'undefined') {
        this.dispatchEvent(
          new CustomEvent<Edge>(NewEdgeEvent, {
            detail: edge,
          })
        )
      }
    } else if (response.hasNewitemrequesterror()) {
      const e = response.getNewitemrequesterror()

      if (typeof e != 'undefined') {
        this.dispatchEvent(
          new CustomEvent<ItemRequestError>(NewItemRequestErrorEvent, {
            detail: e,
          })
        )
      }
    } else if (response.hasStatus()) {
      const status = response.getStatus()

      if (typeof status != 'undefined') {
        this.status = status.toObject()

        this.dispatchEvent(
          new CustomEvent<GatewayRequestStatus>(StatusEvent, {
            detail: status,
          })
        )
      }
    }
  }

  addEventListener(
    type: typeof ErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<string> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof NewItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof NewEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof NewItemRequestErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof StatusEvent,
    callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof SocketErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<Event> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof CloseEvent,
    callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void {
    super.addEventListener(type, callback, options)
  }

  removeEventListener(
    type: typeof ErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<string> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof NewItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof NewEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof NewItemRequestErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<ItemRequestError> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof StatusEvent,
    callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof SocketErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<Event> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof CloseEvent,
    callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    super.removeEventListener(type, callback, options)
  }

  /**
   * Sends a request to the gateway
   * @param request The request to send
   */
  sendRequest(request: GatewayRequest) {
    const binary = request.serializeBinary()
    this.socket.send(binary)
  }

  /**
   * Closes the session
   */
  close() {
    this.socket.close()
  }

  /**
   *
   * @returns The current state of the websocket connection
   */
  state():
    | typeof WebSocket.CONNECTING
    | typeof WebSocket.OPEN
    | typeof WebSocket.CLOSING
    | typeof WebSocket.CLOSED {
    return this.socket.readyState
  }
}