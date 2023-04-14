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
  BookmarkLoadResultEvent,
  BookmarkStoreResultEvent,
  SnapshotLoadResultEvent,
  SnapshotStoreResultEvent,
} from './events'
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
  BookmarkStoreResult,
  BookmarkLoadResult,
  SnapshotStoreResult,
  SnapshotLoadResult,
  StoreBookmark,
  StoreSnapshot,
} from './protobuf'

export interface CustomEventListener<T> {
  (evt: CustomEvent<T>): void
}
export interface CustomEventListenerObject<T> {
  handleEvent(object: CustomEvent<T>): void
}
export type CustomEventListenerOrEventListenerObject<T> =
  | CustomEventListener<T>
  | CustomEventListenerObject<T>

export type State =
  | typeof WebSocket.CONNECTING
  | typeof WebSocket.OPEN
  | typeof WebSocket.CLOSING
  | typeof WebSocket.CLOSED

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
      case 'bookmarkLoadResult':
        this.dispatchEvent(
          new CustomEvent<BookmarkLoadResult>(BookmarkLoadResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'bookmarkStoreResult':
        this.dispatchEvent(
          new CustomEvent<BookmarkStoreResult>(BookmarkStoreResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotLoadResult':
        this.dispatchEvent(
          new CustomEvent<SnapshotLoadResult>(SnapshotLoadResultEvent, {
            detail: response.responseType.value,
          })
        )
        break
      case 'snapshotStoreResult':
        this.dispatchEvent(
          new CustomEvent<SnapshotStoreResult>(SnapshotStoreResultEvent, {
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
   * Creates a bookmark in the gateway and returns the bookmark from a promise
   * @param bookmark The bookmark to create
   */
  storeBookmark(bookmark: StoreBookmark): Promise<BookmarkStoreResult> {
    const req = new GatewayRequest({
      requestType: {
        case: 'storeBookmark',
        value: bookmark,
      },
    })

    const promise = new Promise<BookmarkStoreResult>((resolve, reject) => {
      const listener = (event: CustomEvent<BookmarkStoreResult>) => {
        if (event.detail.bookmark?.properties?.name === bookmark.name) {
          if (event.detail.success) {
            resolve(event.detail)
          } else {
            reject(event.detail)
          }

          this.removeEventListener(BookmarkStoreResultEvent, listener)
        }
      }

      this.addEventListener(BookmarkStoreResultEvent, listener)
    })

    this.sendRequest(req)

    return promise
  }

  /**
   * Creates a snapshot in the gateway and returns the snapshot from a promise
   * @param snapshop The snapshop to create
   */
  storeSnapshot(snapshop: StoreSnapshot): Promise<SnapshotStoreResult> {
    const req = new GatewayRequest({
      requestType: {
        case: 'storeSnapshot',
        value: snapshop,
      },
    })

    const promise = new Promise<SnapshotStoreResult>((resolve, reject) => {
      const listener = (event: CustomEvent<SnapshotStoreResult>) => {
        if (event.detail.snapshot?.properties?.name === snapshop.name) {
          if (event.detail.success) {
            resolve(event.detail)
          } else {
            reject(event.detail)
          }

          this.removeEventListener(SnapshotStoreResultEvent, listener)
        }
      }

      this.addEventListener(SnapshotStoreResultEvent, listener)
    })

    this.sendRequest(req)

    return promise
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
  state(): State {
    return this.socket.readyState as State
  }
}
