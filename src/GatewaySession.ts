import {
  SocketErrorEvent,
  NewItemEvent,
  NewEdgeEvent,
  QueryErrorEvent,
  StatusEvent,
  ErrorEvent,
  CloseEvent,
  DeleteItemEvent,
  DeleteEdgeEvent,
  UpdateItemEvent,
  BookmarkListResultEvent,
  BookmarkLoadResultEvent,
  BookmarkStoreResultEvent,
  BookmarkDeleteResultEvent,
  SnapshotListResultEvent,
  SnapshotLoadResultEvent,
  SnapshotStoreResultEvent,
  SnapshotDeleteResultEvent,
} from './Events'
import {
  Edge,
  GatewayRequest,
  GatewayRequestStatus,
  GatewayResponse,
  Item,
  QueryError,
  Reference,
  UndoQuery,
  UndoExpand,
  BookmarkListResult,
  BookmarkStoreResult,
  BookmarkLoadResult,
  BookmarkDeleteResult,
  SnapshotListResult,
  SnapshotStoreResult,
  SnapshotLoadResult,
  SnapshotDeleteResult,
} from './generated'

export interface CustomEventListener<T> {
  (evt: CustomEvent<T>): void
}
export interface CustomEventListenerObject<T> {
  handleEvent(object: CustomEvent<T>): void
}
export type CustomEventListenerOrEventListenerObject<T> =
  | CustomEventListener<T>
  | CustomEventListenerObject<T>

export class GatewaySession extends EventTarget {
  private socket: WebSocket
  ready: Promise<void>
  status?: GatewayRequestStatus

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
    const response = GatewayResponse.fromBinary(binary)

    switch (response.responseType.case) {
      case 'error':
        this.dispatchEvent(
          new CustomEvent<string>(ErrorEvent, {
            detail: response.responseType.value,
          })
        )
        break

      case 'newItem':
        this.dispatchEvent(
          new CustomEvent<Item>(NewItemEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'newEdge':
        this.dispatchEvent(
          new CustomEvent<Edge>(NewEdgeEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'status':
        // Update the local status
        this.status = response.responseType.value

        this.dispatchEvent(
          new CustomEvent<GatewayRequestStatus>(StatusEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'queryError':
        this.dispatchEvent(
          new CustomEvent<QueryError>(QueryErrorEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'deleteItem':
        this.dispatchEvent(
          new CustomEvent<Reference>(DeleteItemEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'deleteEdge':
        this.dispatchEvent(
          new CustomEvent<Edge>(DeleteEdgeEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'updateItem':
        this.dispatchEvent(
          new CustomEvent<Item>(UpdateItemEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'bookmarkListResult':
        this.dispatchEvent(
          new CustomEvent<Item>(BookmarkListResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'bookmarkLoadResult':
        this.dispatchEvent(
          new CustomEvent<Item>(BookmarkLoadResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'bookmarkStoreResult':
        this.dispatchEvent(
          new CustomEvent<Item>(BookmarkStoreResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'bookmarkDeleteResult':
        this.dispatchEvent(
          new CustomEvent<Item>(BookmarkDeleteResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotListResult':
        this.dispatchEvent(
          new CustomEvent<Item>(SnapshotListResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotLoadResult':
        this.dispatchEvent(
          new CustomEvent<Item>(SnapshotLoadResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotStoreResult':
        this.dispatchEvent(
          new CustomEvent<Item>(SnapshotStoreResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotDeleteResult':
        this.dispatchEvent(
          new CustomEvent<Item>(SnapshotDeleteResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      default:
        break
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
    type: typeof DeleteItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Reference> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof DeleteEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof UpdateItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof BookmarkListResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkListResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof BookmarkStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof BookmarkLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof BookmarkDeleteResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkDeleteResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof SnapshotListResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotListResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof SnapshotStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof SnapshotLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof SnapshotDeleteResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotDeleteResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof QueryErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryError> | null,
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
    type: typeof DeleteItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Reference> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof DeleteEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof UpdateItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof BookmarkListResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkListResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof BookmarkStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof BookmarkLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof BookmarkDeleteResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkDeleteResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof SnapshotListResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotListResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof SnapshotStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof SnapshotLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof SnapshotDeleteResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotDeleteResult> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof QueryErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryError> | null,
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
    const binary = request.toBinary()
    this.socket.send(binary)
  }

  /**
   * Undoes a request at the gateway
   * @param request The request to undo
   */
  undoRequest(request: GatewayRequest) {
    switch (request.requestType.case) {
      case 'query':
        {
          const undoReq = new GatewayRequest({
            requestType: {
              case: 'undoQuery',
              value: new UndoQuery({
                UUID: request.requestType.value.UUID,
              }),
            },
          })

          const binary = undoReq.toBinary()
          this.socket.send(binary)
        }
        break
      case 'expand':
        {
          const undoReq = new GatewayRequest({
            requestType: {
              case: 'undoExpand',
              value: new UndoExpand({
                UUID: request.requestType.value.UUID,
              }),
            },
          })

          const binary = undoReq.toBinary()
          this.socket.send(binary)
        }
        break
    }
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
