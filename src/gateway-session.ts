import { v4, parse } from 'uuid'
import {
  SocketErrorEvent,
  NewItemEvent,
  NewEdgeEvent,
  QueryStatusEvent,
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
  ChatResponseEvent,
  ChatResponseToolFinishEvent,
  ChatResponseToolStartEvent,
} from './events'
import {
  Edge,
  GatewayRequest,
  GatewayRequestStatus,
  GatewayResponse,
  Item,
  QueryStatus,
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
  ChatResponse,
  ToolStart,
  ToolFinish,
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

type RecordedMessage = {
  msg: Uint8Array
  timestamp: Date
}

type RecordedMessageJSON = {
  msg: string
  timestamp: string
}

// Converts a Uint8Array to a Base64 string
function uint8ArrayToBase64(buffer: Uint8Array): string {
  return btoa(String.fromCharCode.apply(undefined, [...buffer]))
}

// Converts a Base64 string back to a Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    const codePointAt = binaryString.codePointAt(i)
    if (codePointAt) {
      bytes[i] = codePointAt
    }
  }
  return bytes
}

export class GatewaySession extends EventTarget {
  private socket: WebSocket
  ready: Promise<void>
  status?: GatewayRequestStatus

  // Data that was recorded from this session. Will only be populated if `record`
  // is set to true when creating the session
  _recordedData: RecordedMessage[] = []

  constructor(url: string, record = false) {
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
        { once: true },
      )
    })

    this.socket.addEventListener('error', (event) => {
      this.dispatchEvent(
        new CustomEvent<Event>(SocketErrorEvent, {
          detail: event,
        }),
      )
    })

    this.socket.addEventListener('close', (closeEvent) => {
      this.dispatchEvent(
        new CustomEvent<CloseEvent>(CloseEvent, {
          detail: closeEvent,
        }),
      )
    })

    this.socket.addEventListener('message', (ev: MessageEvent<ArrayBuffer>) => {
      this._processMessage(ev.data)
    })

    if (record) {
      this.socket.addEventListener(
        'message',
        (ev: MessageEvent<ArrayBuffer>) => {
          this._recordedData.push({
            msg: new Uint8Array(ev.data),
            timestamp: new Date(),
          })
        },
      )
    }
  }

  /**
   * Exports the recorded data as a JSON string. This can be used to replay the
   * data later if the `record` option was set to true when creating the session
   */
  exportRecordingJSON(): string {
    const data: RecordedMessageJSON[] = this._recordedData.map((msg) => {
      return {
        msg: uint8ArrayToBase64(msg.msg),
        timestamp: msg.timestamp.toISOString(),
      }
    })

    return JSON.stringify(data)
  }

  /**
   * Replays the recorded data
   * @param data The recorded data to replay
   */
  async replayRecordingJSON(jsonString: string) {
    const parsedData = JSON.parse(jsonString)
    const data: RecordedMessage[] = parsedData.map(
      (item: { msg: string; timestamp: string }): RecordedMessage => ({
        msg: base64ToUint8Array(item.msg),
        timestamp: new Date(item.timestamp),
      }),
    )

    // Loop over the data using the index
    for (let i = 0; i < data.length; i++) {
      // Process the message
      this._processMessage(data[i].msg)

      // If we are not at the end of the array, calculate the time to wait
      if (i < data.length - 1) {
        const next = data[i + 1]
        const current = data[i]

        // Calculate the time to wait
        const timeToWait =
          next.timestamp.getTime() - current.timestamp.getTime()

        // Wait for the timeToWait before going to the next message using await
        await new Promise((resolve) => setTimeout(resolve, timeToWait))
      }
    }
  }

  /**
   * Processing inbound messages
   * @param buffer A buffer containing the binary message
   */
  _processMessage(buffer: ArrayBuffer) {
    const binary = new Uint8Array(buffer)
    const response = GatewayResponse.fromBinary(binary)

    switch (response.responseType.case) {
      case 'error': {
        this.dispatchEvent(
          new CustomEvent<string>(ErrorEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }

      case 'newItem': {
        this.dispatchEvent(
          new CustomEvent<Item>(NewItemEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'newEdge': {
        this.dispatchEvent(
          new CustomEvent<Edge>(NewEdgeEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'status': {
        // Update the local status
        this.status = response.responseType.value

        this.dispatchEvent(
          new CustomEvent<GatewayRequestStatus>(StatusEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'queryStatus': {
        this.dispatchEvent(
          new CustomEvent<QueryStatus>(QueryStatusEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'queryError': {
        this.dispatchEvent(
          new CustomEvent<QueryError>(QueryErrorEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'deleteItem': {
        this.dispatchEvent(
          new CustomEvent<Reference>(DeleteItemEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'deleteEdge': {
        this.dispatchEvent(
          new CustomEvent<Edge>(DeleteEdgeEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'updateItem': {
        this.dispatchEvent(
          new CustomEvent<Item>(UpdateItemEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'bookmarkLoadResult': {
        this.dispatchEvent(
          new CustomEvent<BookmarkLoadResult>(BookmarkLoadResultEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'bookmarkStoreResult': {
        this.dispatchEvent(
          new CustomEvent<BookmarkStoreResult>(BookmarkStoreResultEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'snapshotLoadResult': {
        this.dispatchEvent(
          new CustomEvent<SnapshotLoadResult>(SnapshotLoadResultEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'snapshotStoreResult': {
        this.dispatchEvent(
          new CustomEvent<SnapshotStoreResult>(SnapshotStoreResultEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'chatResponse': {
        this.dispatchEvent(
          new CustomEvent<ChatResponse>(ChatResponseEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'toolStart': {
        this.dispatchEvent(
          new CustomEvent<ToolStart>(ChatResponseToolStartEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      case 'toolFinish': {
        this.dispatchEvent(
          new CustomEvent<ToolFinish>(ChatResponseToolFinishEvent, {
            detail: response.responseType.value,
          }),
        )
        break
      }
      default: {
        break
      }
    }
  }

  addEventListener(
    type: typeof ErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<string> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof NewItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof NewEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof DeleteItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Reference> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof DeleteEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof UpdateItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof BookmarkStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof BookmarkLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof SnapshotStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof SnapshotLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof ChatResponseEvent,
    callback: CustomEventListenerOrEventListenerObject<ChatResponse> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof ChatResponseToolStartEvent,
    callback: CustomEventListenerOrEventListenerObject<ToolStart> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof ChatResponseToolFinishEvent,
    callback: CustomEventListenerOrEventListenerObject<ToolFinish> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof QueryStatusEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof QueryErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryError> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof StatusEvent,
    callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof SocketErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<Event> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: typeof CloseEvent,
    callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean,
  ): void {
    super.addEventListener(type, callback, options)
  }

  removeEventListener(
    type: typeof ErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<string> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof NewItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof NewEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof DeleteItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Reference> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof DeleteEdgeEvent,
    callback: CustomEventListenerOrEventListenerObject<Edge> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof UpdateItemEvent,
    callback: CustomEventListenerOrEventListenerObject<Item> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof BookmarkStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof BookmarkLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<BookmarkLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof SnapshotStoreResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotStoreResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof SnapshotLoadResultEvent,
    callback: CustomEventListenerOrEventListenerObject<SnapshotLoadResult> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof ChatResponseEvent,
    callback: CustomEventListenerOrEventListenerObject<ChatResponse> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof ChatResponseToolStartEvent,
    callback: CustomEventListenerOrEventListenerObject<ToolStart> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof ChatResponseToolFinishEvent,
    callback: CustomEventListenerOrEventListenerObject<ToolFinish> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof QueryStatusEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof QueryErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<QueryError> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof StatusEvent,
    callback: CustomEventListenerOrEventListenerObject<GatewayRequestStatus> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof SocketErrorEvent,
    callback: CustomEventListenerOrEventListenerObject<Event> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: typeof CloseEvent,
    callback: CustomEventListenerOrEventListenerObject<CloseEvent> | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void

  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined,
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
      case 'query': {
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
      }
      case 'expand': {
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
  }

  /**
   * Creates a bookmark in the gateway and returns the bookmark from a promise
   * @param bookmark The bookmark to create
   */
  storeBookmark(bookmark: StoreBookmark): Promise<BookmarkStoreResult> {
    // Set a custom message ID if not set
    if (bookmark.msgID.length === 0) {
      bookmark.msgID = parse(v4())
    }

    const req = new GatewayRequest({
      requestType: {
        case: 'storeBookmark',
        value: bookmark,
      },
    })

    return new Promise<BookmarkStoreResult>((resolve, reject) => {
      const listener = (event: CustomEvent<BookmarkStoreResult>) => {
        if (event.detail.msgID.toString() === bookmark.msgID.toString()) {
          if (event.detail.success) {
            resolve(event.detail)
          } else {
            reject(event.detail)
          }

          this.removeEventListener(BookmarkStoreResultEvent, listener)
        }
      }

      this.addEventListener(BookmarkStoreResultEvent, listener)

      this.sendRequest(req)
    })
  }

  /**
   * Creates a snapshot in the gateway and returns the snapshot from a promise
   * @param snapshot The snapshot to create
   */
  storeSnapshot(snapshot: StoreSnapshot): Promise<SnapshotStoreResult> {
    // Set a custom message ID
    if (snapshot.msgID.length === 0) {
      snapshot.msgID = parse(v4())
    }

    const req = new GatewayRequest({
      requestType: {
        case: 'storeSnapshot',
        value: snapshot,
      },
    })

    return new Promise<SnapshotStoreResult>((resolve, reject) => {
      const listener = (event: CustomEvent<SnapshotStoreResult>) => {
        if (event.detail.msgID.toString() === snapshot.msgID.toString()) {
          if (event.detail.success) {
            resolve(event.detail)
          } else {
            reject(event.detail)
          }

          this.removeEventListener(SnapshotStoreResultEvent, listener)
        }
      }

      this.addEventListener(SnapshotStoreResultEvent, listener)

      this.sendRequest(req)
    })
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
