import { Duration } from 'google-protobuf/google/protobuf/duration_pb'
import {
  JavaScriptValue,
  Struct,
} from 'google-protobuf/google/protobuf/struct_pb'
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import { parse as uuidParse, v4 as uuidv4 } from 'uuid'
import {
  CancelItemRequest,
  Edge,
  GatewayRequest,
  GatewayRequestStatus,
  GatewayResponse,
  Item,
  ItemAttributes,
  ItemRequest,
  ItemRequestError,
  Metadata,
  Reference,
  RequestMethod,
  ResponderState,
  Response,
} from './__generated__/'
import { ExpandItemRequest, UndoItemRequest } from './__generated__/gateway_pb'

export type EdgeData = {
  from: ReferenceData
  to: ReferenceData
}

export type ReferenceData = {
  type: string
  uniqueAttributeValue: string
  scope: string
}

export type ItemData = {
  type: string
  uniqueAttribute: string
  scope: string
  attributes: ItemAttributes
  metadata: Metadata | undefined
  linkedItemRequests: ItemRequest[]
  linkedItems: Reference[]
}

export type GatewayRequestStatusData = {
  responderStates: Map<string, ResponderState>
  summary: {
    working: number
    stalled: number
    complete: number
    error: number
    cancelled: number
    responders: number
  }
  postProcessingComplete: boolean
}

export type ItemRequestErrorData = {
  scope: string
  errorString: string
  errorType: ItemRequestError.ErrorType
}

//
// Private helper functions
//
function convertRequestMethod(
  method: 'GET' | 'LIST' | 'SEARCH'
): RequestMethod {
  switch (method) {
    case 'GET': {
      return RequestMethod.GET
    }
    case 'LIST': {
      return RequestMethod.LIST
    }
    case 'SEARCH': {
      return RequestMethod.SEARCH
    }
  }
}

// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom(data: Uint8Array): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEF'
  const padding = false

  // For reasons that I cannot possibly fathom, it's possible (likely) that we
  // can be passed a Uint8Array that is not an instance of Uint8Array. Sounds
  // dumb right? Yes, yes it does. Someone smarter than me can probably
  // explain how this can be justified but it makes no sense to me, Reference:
  // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
  const actualData = new Uint8Array(data)
  const view = toDataView(actualData)

  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < view.byteLength; i++) {
    value = (value << 8) | view.getUint8(i)
    bits += 8

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31]
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '='
    }
  }

  return output
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isItemRequestData(x: any): x is ItemRequestData {
  const hasType = 'type' in x
  const hasMethod = 'method' in x
  const hasQuery = 'query' in x
  const hasLinkDepth = 'linkDepth' in x
  const hasScope = 'scope' in x
  const hasUUID = 'UUID' in x

  return hasType && hasMethod && hasQuery && hasLinkDepth && hasScope && hasUUID
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isReferenceData(x: any): x is ReferenceData {
  const hasType = 'type' in x
  const hasUniqueAttributeValue = 'uniqueAttributeValue' in x
  const hasScope = 'scope' in x

  return hasType && hasUniqueAttributeValue && hasScope
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isItemData(x: any): x is ItemData {
  const hasType = 'type' in x
  const hasUniqueAttribute = 'uniqueAttribute' in x
  const hasScope = 'scope' in x
  const hasAttributes = 'attributes' in x
  const hasMetadata = 'metadata' in x
  const hasLinkedItemRequests = 'linkedItemRequests' in x
  const hasLinkedItems = 'linkedItems' in x

  return (
    hasType &&
    hasUniqueAttribute &&
    hasScope &&
    hasAttributes &&
    hasMetadata &&
    hasLinkedItemRequests &&
    hasLinkedItems
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isEdgeData(x: any): x is EdgeData {
  const hasFrom = 'from' in x
  const hasTo = 'to' in x

  return hasFrom && hasTo
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isItemRequestErrorData(x: any): x is ItemRequestErrorData {
  const hasScope = 'scope' in x
  const hasErrorString = 'errorString' in x
  const hasErrorType = 'errorType' in x

  return hasScope && hasErrorString && hasErrorType
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGatewayRequestStatusData(x: any): x is GatewayRequestStatusData {
  const hasResponderStates = 'responderStates' in x
  const hasSummary = 'summary' in x
  const hasPostProcessingComplete = 'postProcessingComplete' in x

  return hasResponderStates && hasSummary && hasPostProcessingComplete
}

function toDataView(
  data: Int8Array | Uint8Array | Uint8ClampedArray | ArrayBuffer
) {
  if (
    data instanceof Int8Array ||
    data instanceof Uint8Array ||
    data instanceof Uint8ClampedArray
  ) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength)
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data)
  }

  throw new TypeError(
    'Expected `data` to be an ArrayBuffer, Buffer, Int8Array, Uint8Array or Uint8ClampedArray'
  )
}

/**
 * Generates a new random UUID
 * @returns A new UUIDv4 as a Uint8Array
 */
export function newUUID(): Uint8Array {
  return Uint8Array.from(uuidParse(uuidv4()))
}

/**
 * Generates a new random UUID
 * @returns A new UUID as a string
 */
export function newUUIDString(): string {
  return uuidv4()
}

/**
 * Gets the globally unique name of an object
 * @param object The object to get the globally unique name from
 * @returns The globally unique name
 */
export function getGloballyuniquename(object: Reference | Item): string {
  const elements: string[] = [
    object.getScope(),
    object.getType(),
    getUniqueattributevalue(object),
  ]

  return elements.join('.')
}

/**
 * **(Experimental)** Gets the unique hash for the object. Used for database uniqueness.
 * @param object The object to calculate the hash for
 * @returns The hash as a string
 */
export async function getHash(object: Reference | Item) {
  const name = getGloballyuniquename(object)
  const textAsBuffer = new TextEncoder().encode(name)
  const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer)
  const bytes = new Uint8Array(hashBuffer)
  const base32String = base32EncodeCustom(bytes)

  return base32String.substring(0, 11)
}

/**
 * Gets the unique attribute value of an object
 * @param object The object to get the unique attribute value for
 * @returns The unique attribute value as a string
 */
export function getUniqueattributevalue(object: Item | Reference): string {
  if ('getUniqueattributevalue' in object) {
    return object.getUniqueattributevalue()
  } else {
    const uniqueAttribute = object.getUniqueattribute()
    const attributes = object.getAttributes()

    if (typeof attributes != 'undefined') {
      const value = getAttributeValue(attributes, uniqueAttribute)
      return String(value)
    } else {
      return ''
    }
  }
}

/**
 * Gets the value of a particular attribute. *Note:* that this only supports
 * attributes at the top level currently
 * @param attributes The attributes to query
 * @param name The name of the attribute you are looking for
 * @returns The value of the attribute
 */
export function getAttributeValue(attributes: ItemAttributes, name: string) {
  const object = attributes.getAttrstruct()?.toJavaScript()

  if (typeof object === 'undefined') {
    return undefined
  } else {
    return object[name]
  }
}

/**
 * Returns a reference to the supplied item
 * @param item The item that you want a reference to
 * @returns A reference to the supplied item
 */
export function getReference(item: Item): Reference {
  const ref = new Reference()

  ref.setScope(item.getScope())
  ref.setType(item.getType())
  ref.setUniqueattributevalue(getUniqueattributevalue(item))

  return ref
}

/**
 * Convert a durationpb to javascript Date object
 * @param duration The duration object to convert
 * @returns A javascript `Date` object
 */
export function toDate(duration: Duration): Date {
  return new Date(toMs(duration))
}

/**
 * Converts a number of milliseconds to a duration
 * @param ms The number of milliseconds
 */
export function toDuration(ms: number): Duration {
  const d = new Duration()
  d.setSeconds(Math.floor(ms / 1000))
  d.setNanos((ms % 1000) * 1000000)
  return d
}

export function toMs(duration: Duration): number {
  return duration.getSeconds() * 1000 + duration.getNanos() / 1_000_000
}

/**
 * Create a new `Item` object from a single object
 * @param details The details of the item you want to create
 * @returns A new Item object
 */
export function newItem(details: ItemData): Item {
  const item = new Item()

  item.setType(details.type)
  item.setUniqueattribute(details.uniqueAttribute)
  item.setScope(details.scope)
  item.setAttributes(details.attributes)

  if (typeof details.metadata != 'undefined') {
    item.setMetadata(details.metadata)
  }

  item.setLinkeditemrequestsList(details.linkedItemRequests)
  item.setLinkeditemsList(details.linkedItems)

  return item
}

/**
 * Creates a new ItemAttributes object from any javascript object that has
 * string keys
 * @param value Any object with string keys
 * @returns A new ItemAttributes object
 */
export function newItemAttributes(value: {
  [key: string]: JavaScriptValue
}): ItemAttributes {
  const attributes = new ItemAttributes()
  attributes.setAttrstruct(Struct.fromJavaScript(value))

  return attributes
}

export type MetadataData = {
  sourceName: string
  sourceRequest: ItemRequestData
  timestamp: Date
  sourceDuration: number // milliseconds
  sourceDurationPerItem: number // milliseconds
}

/**
 * Creates a new `Metadata` object from a object
 * @param data The metadata you want the new object to have
 * @returns A new Metadata object
 */
export function newMetadata(data: MetadataData): Metadata {
  const m = new Metadata()

  m.setSourcename(data.sourceName)
  m.setSourcerequest(newItemRequest(data.sourceRequest))

  const timestamp = new Timestamp()
  timestamp.fromDate(data.timestamp)
  m.setTimestamp(timestamp)

  const sourceDuration = new Duration()
  sourceDuration.setSeconds(Math.floor(data.sourceDuration / 1000))
  sourceDuration.setNanos((data.sourceDuration % 1000) * 1e6)
  m.setSourceduration(sourceDuration)

  const sourceDurationPerItem = new Duration()
  sourceDurationPerItem.setSeconds(
    Math.floor(data.sourceDurationPerItem / 1000)
  )
  sourceDurationPerItem.setNanos((data.sourceDurationPerItem % 1000) * 1e6)
  m.setSourcedurationperitem(sourceDurationPerItem)

  return m
}

/**
 * Creates a new ItemRequestError from a single object
 * @param details The details of the error to create
 * @returns The new error object
 */
export function newItemRequestError(
  details: ItemRequestErrorData
): ItemRequestError {
  const err = new ItemRequestError()

  err.setScope(details.scope)
  err.setErrorstring(details.errorString)
  err.setErrortype(details.errorType)

  return err
}

export type ItemRequestData = {
  type: string
  method: 'GET' | 'LIST' | 'SEARCH'
  query: string
  linkDepth: number
  scope: string
  UUID: string | Uint8Array
  itemSubject?: string
  responseSubject?: string
  errorSubject?: string
  timeoutMs?: number
}

/**
 * Creates a new ItemRequest object from a single object
 * @param details The details that you want the new ItemRequest to have
 * @returns A new ItemRequest object
 */
export function newItemRequest(details: ItemRequestData): ItemRequest {
  const r = new ItemRequest()

  r.setType(details.type)
  r.setMethod(convertRequestMethod(details.method))
  r.setQuery(details.query)
  r.setLinkdepth(details.linkDepth)
  r.setScope(details.scope)
  r.setItemsubject(details.itemSubject || '')
  r.setResponsesubject(details.responseSubject || '')
  r.setErrorsubject(details.errorSubject || '')

  if (typeof details.UUID == 'string') {
    r.setUuid(Uint8Array.from(uuidParse(details.UUID)))
  } else {
    r.setUuid(details.UUID)
  }

  if (typeof details.timeoutMs != 'undefined') {
    r.setTimeout(toDuration(details.timeoutMs))
  }

  return r
}

/**
 * Create a new Reference from a single object
 * @param details The details that you want the new reference to contain
 * @returns The new Reference object
 */
export function newReference(details: ReferenceData): Reference {
  const r = new Reference()

  r.setType(details.type)
  r.setUniqueattributevalue(details.uniqueAttributeValue)
  r.setScope(details.scope)

  return r
}

export type ResponseData = {
  responder: string
  state: ResponderState
  nextUpdateInMs?: number
}

/**
 * Creates a new Response object from a single object
 * @param details The details you want the new Response object to have
 * @returns The new Response object
 */
export function newResponse(details: ResponseData): Response {
  const r = new Response()

  r.setResponder(details.responder)
  r.setState(details.state)

  if (typeof details.nextUpdateInMs != 'undefined') {
    r.setNextupdatein(toDuration(details.nextUpdateInMs))
  }

  return r
}

export type CancelItemRequestData = {
  UUID: string | Uint8Array
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCancelItemRequestData(x: any): x is CancelItemRequestData {
  return 'UUID' in x
}

/**
 * Creates a new CancelItemRequest object from given params. Note that the
 * UUID can be provided as a string e.g.
 * "bcee962c-ca60-479b-8a96-ab970d878392" or directly uas a Uint8Array
 * @param details The details you want the new CancelItemRequest object to
 * have
 * @returns The new CancelItemRequest object
 */
export function newCancelItemRequest(
  details: CancelItemRequestData
): CancelItemRequest {
  const c = new CancelItemRequest()

  if (typeof details.UUID == 'string') {
    const buffer = uuidParse(details.UUID)
    c.setUuid(Uint8Array.from(buffer))
  } else {
    c.setUuid(details.UUID)
  }

  return c
}

/**
 * Creates a new Edge object
 * @param data Data to be used in the object
 * @returns A new Edge object
 */
export function newEdge(data: EdgeData): Edge {
  const e = new Edge()

  e.setFrom(newReference(data.from))
  e.setTo(newReference(data.to))

  return e
}

export function newGatewayRequestStatus(
  data: GatewayRequestStatusData
): GatewayRequestStatus {
  const grs = new GatewayRequestStatus()
  const responders = grs.getResponderstatesMap()
  const summary = new GatewayRequestStatus.Summary()

  for (const [responder, state] of data.responderStates) {
    responders.set(responder, state)
  }

  summary.setWorking(data.summary.working)
  summary.setStalled(data.summary.stalled)
  summary.setComplete(data.summary.complete)
  summary.setError(data.summary.error)
  summary.setCancelled(data.summary.cancelled)
  summary.setResponders(data.summary.responders)
  grs.setSummary(summary)

  grs.setPostprocessingcomplete(data.postProcessingComplete)

  return grs
}

export type UndoItemRequestData = {
  UUID: string | Uint8Array
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUndoItemRequestData(x: any): x is UndoItemRequestData {
  return 'UUID' in x
}

/**
 * Create a new UndoItemRequest
 *
 * @param uuid The UUID of the request to undo
 * @returns A new request
 */
export function newUndoItemRequest(data: UndoItemRequestData): UndoItemRequest {
  const r = new UndoItemRequest()

  r.setUuid(data.UUID)

  return r
}

export type ExpandItemRequestData = {
  item: ReferenceData | Reference // The item to be expanded
  linkDepth: number // How deeply to link the results
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isExpandItemRequestData(x: any): x is ExpandItemRequestData {
  return 'item' in x && 'linkDepth' in x
}

/**
 * Creates a new expand item request
 *
 * @param data The data that the expand item request should contain
 * @returns A new expand item request
 */
export function newExpandItemRequest(
  data: ExpandItemRequestData
): ExpandItemRequest {
  const r = new ExpandItemRequest()

  if (isReferenceData(data.item)) {
    r.setItem(newReference(data.item))
  } else {
    r.setItem(data.item)
  }

  r.setLinkdepth(data.linkDepth)

  return r
}

export type GatewayRequestData = {
  newRequest?: ItemRequestData | ItemRequest
  cancelRequest?: CancelItemRequestData | CancelItemRequest
  undoRequest?: UndoItemRequestData | UndoItemRequest
  excludeItem?: ReferenceData | Reference
  includeItem?: ReferenceData | Reference
  expandItem?: ExpandItemRequestData | ExpandItemRequest
  unexpandItem?: ReferenceData | Reference
}

/**
 * Creates a new GatewayRequest object. This is an abstraction that wraps either
 * an ItemRequest or a CancelItemRequest, along with a timeout
 * @param data The gateway request data to use. Note that only one property
 * should be defined for a given request
 * @param minStatusIntervalMs The minimum duration between status responses
 * @returns A new GatewayRequest
 */
export function newGatewayRequest(
  data: GatewayRequestData,
  minStatusIntervalMs: number
): GatewayRequest {
  const gr = new GatewayRequest()

  // Validate that we only have one thing set
  const hasNewRequest = !(data.newRequest == undefined)
  const hasCancelRequest = !(data.cancelRequest == undefined)
  const hasUndoRequest = !(data.undoRequest == undefined)
  const hasExcludeItem = !(data.excludeItem == undefined)
  const hasIncludeItem = !(data.includeItem == undefined)
  const hasExpandItem = !(data.expandItem == undefined)
  const hasUnexpandItem = !(data.unexpandItem == undefined)

  const fields = [
    hasNewRequest,
    hasCancelRequest,
    hasUndoRequest,
    hasExcludeItem,
    hasIncludeItem,
    hasExpandItem,
    hasUnexpandItem,
  ]

  // Count the number of true things in the array
  const numPopulated = fields.filter(Boolean).length

  if (numPopulated != 1) {
    throw new Error(
      'invalid data for gateway request, must have exactly 1 field populated'
    )
  }

  if (hasNewRequest) {
    if (data.newRequest != undefined) {
      let newRequest: ItemRequest

      if (isItemRequestData(data.newRequest)) {
        newRequest = newItemRequest(data.newRequest)
      } else {
        newRequest = data.newRequest
      }

      gr.setNewrequest(newRequest)
    }
  }

  if (hasCancelRequest) {
    if (data.cancelRequest != undefined) {
      let cancelRequest: CancelItemRequest

      if (isCancelItemRequestData(data.cancelRequest)) {
        cancelRequest = newCancelItemRequest(data.cancelRequest)
      } else {
        cancelRequest = data.cancelRequest
      }

      gr.setCancelrequest(cancelRequest)
    }
  }

  if (hasUndoRequest) {
    if (data.undoRequest != undefined) {
      let undoRequest: UndoItemRequest

      if (isUndoItemRequestData(data.undoRequest)) {
        undoRequest = newUndoItemRequest(data.undoRequest)
      } else {
        undoRequest = data.undoRequest
      }

      gr.setUndorequest(undoRequest)
    }
  }

  if (hasExcludeItem) {
    if (data.excludeItem != undefined) {
      let excludeItem: Reference

      if (isReferenceData(data.excludeItem)) {
        excludeItem = newReference(data.excludeItem)
      } else {
        excludeItem = data.excludeItem
      }

      gr.setExcludeitem(excludeItem)
    }
  }

  if (hasIncludeItem) {
    if (data.includeItem != undefined) {
      let includeItem: Reference

      if (isReferenceData(data.includeItem)) {
        includeItem = newReference(data.includeItem)
      } else {
        includeItem = data.includeItem
      }

      gr.setIncludeitem(includeItem)
    }
  }

  if (hasExpandItem) {
    if (data.expandItem != undefined) {
      let expandItem: ExpandItemRequest

      if (isExpandItemRequestData(data.expandItem)) {
        expandItem = newExpandItemRequest(data.expandItem)
      } else {
        expandItem = data.expandItem
      }

      gr.setExpanditem(expandItem)
    }
  }

  if (hasUnexpandItem) {
    if (data.unexpandItem != undefined) {
      let unexpandItem: Reference

      if (isReferenceData(data.unexpandItem)) {
        unexpandItem = newReference(data.unexpandItem)
      } else {
        unexpandItem = data.unexpandItem
      }

      gr.setUnexpanditem(unexpandItem)
    }
  }

  if (minStatusIntervalMs > 0) {
    gr.setMinstatusinterval(toDuration(minStatusIntervalMs))
  }

  return gr
}

/**
 * Checks if a gateway request is done, this means that there are no more
 * responders working and all post-processing is complete
 * @param g The GatewayRequestStatus to check
 * @returns True of the request is done, false otherwise
 */
export function gatewayRequestStatusDone(g: GatewayRequestStatus): boolean {
  const summary = g.getSummary()

  if (typeof summary != 'undefined') {
    return g.getPostprocessingcomplete() && summary.getWorking() == 0
  }

  return false
}

export type GatewayResponseData = {
  newItem?: ItemData | Item
  newEdge?: EdgeData | Edge
  deleteItem?: ReferenceData | Reference
  deleteEdge?: EdgeData | Edge
  updateItem?: ItemData | Item
  newItemRequestError?: ItemRequestErrorData | ItemRequestError
  status?: GatewayRequestStatusData | GatewayRequestStatus
  error?: string
}

export function newGatewayResponse(data: GatewayResponseData): GatewayResponse {
  const gr = new GatewayResponse()

  const hasNewItem = typeof data.newItem != 'undefined'
  const hasNewEdge = typeof data.newEdge != 'undefined'
  const hasDeleteItem = typeof data.deleteItem != 'undefined'
  const hasDeleteEdge = typeof data.deleteEdge != 'undefined'
  const hasUpdateItem = typeof data.updateItem != 'undefined'
  const hasNewItemRequestError = typeof data.newItemRequestError != 'undefined'
  const hasStatus = typeof data.status != 'undefined'
  const hasError = typeof data.error != 'undefined'

  const fields = [
    hasNewItem,
    hasNewEdge,
    hasDeleteItem,
    hasDeleteEdge,
    hasUpdateItem,
    hasNewItemRequestError,
    hasStatus,
    hasError,
  ]

  // Count the number of true things in the array
  const numPopulated = fields.filter(Boolean).length

  if (numPopulated != 1) {
    throw new Error(
      'invalid data for gateway response, must have exactly 1 field populated'
    )
  }

  if (hasNewItem) {
    if (isItemData(data.newItem)) {
      gr.setNewitem(newItem(data.newItem))
    } else {
      gr.setNewitem(data.newItem)
    }
    return gr
  }

  if (hasNewEdge) {
    if (isEdgeData(data.newEdge)) {
      gr.setNewedge(newEdge(data.newEdge))
    } else {
      gr.setNewedge(data.newEdge)
    }
    return gr
  }

  if (hasDeleteItem) {
    if (isReferenceData(data.deleteItem)) {
      gr.setDeleteitem(newReference(data.deleteItem))
    } else {
      gr.setDeleteitem(data.deleteItem)
    }
    return gr
  }

  if (hasDeleteEdge) {
    if (isEdgeData(data.deleteEdge)) {
      gr.setDeleteedge(newEdge(data.deleteEdge))
    } else {
      gr.setDeleteedge(data.deleteEdge)
    }
    return gr
  }

  if (hasUpdateItem) {
    if (isItemData(data.updateItem)) {
      gr.setUpdateitem(newItem(data.updateItem))
    } else {
      gr.setUpdateitem(data.updateItem)
    }
    return gr
  }

  if (hasNewItemRequestError) {
    if (isItemRequestErrorData(data.newItemRequestError)) {
      gr.setNewitemrequesterror(newItemRequestError(data.newItemRequestError))
    } else {
      gr.setNewitemrequesterror(data.newItemRequestError)
    }
    return gr
  }

  if (hasStatus) {
    if (isGatewayRequestStatusData(data.status)) {
      gr.setStatus(newGatewayRequestStatus(data.status))
    } else {
      gr.setStatus(data.status)
    }
    return gr
  }

  if (hasError) {
    if (typeof data.error != 'undefined') {
      gr.setError(data.error)
    }
    return gr
  }

  return gr
}
