import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import {
  JavaScriptValue,
  Struct,
} from "google-protobuf/google/protobuf/struct_pb";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import sha1 from "sha1";

import toDataView from "to-data-view";
import { parse as uuidParse, v4 as uuidv4 } from "uuid";
import {
  ItemData,
  EdgeData,
  ItemRequestErrorData,
  GatewayRequestStatusData,
  ReferenceData,
} from "./types";
import {
  GatewayRequest,
  GatewayRequestStatus,
  GatewayResponse,
} from "./__generated__/gateway_pb";
import {
  CancelItemRequest,
  Edge,
  Item,
  ItemAttributes,
  ItemRequest,
  Metadata,
  Reference,
  RequestMethod,
} from "./__generated__/items_pb";
import {
  ItemRequestError,
  ResponderState,
  Response,
} from "./__generated__/responses_pb";

//
// Private helper functions
//
function convertRequestMethod(
  method: "GET" | "LIST" | "SEARCH"
): RequestMethod {
  switch (method) {
    case "GET": {
      return RequestMethod.GET;
    }
    case "LIST": {
      return RequestMethod.LIST;
    }
    case "SEARCH": {
      return RequestMethod.SEARCH;
    }
  }
}

// This is a copied and modified version of
// https://github.com/LinusU/base32-encode made to support my custom encoding
function base32EncodeCustom(data: Uint8Array): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEF";
  const padding = false;

  // For reasons that I cannot possibly fathom, it's possible (likely) that we
  // can be passed a Uint8Array that is not an instance of Uint8Array. Sounds
  // dumb right? Yes, yes it does. Someone smarter than me can probably
  // explain how this can be justified but it makes no sense to me, Reference:
  // https://medium.com/@simonwarta/limitations-of-the-instanceof-operator-f4bcdbe7a400
  const actualData = new Uint8Array(data);
  const view = toDataView(actualData);

  let bits = 0;
  let value = 0;
  let output = "";

  for (let i = 0; i < view.byteLength; i++) {
    value = (value << 8) | view.getUint8(i);
    bits += 8;

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += "=";
    }
  }

  return output;
}

function isItemData(x: any): x is ItemData {
  const hasType = "type" in x;
  const hasUniqueAttribute = "uniqueAttribute" in x;
  const hasScope = "scope" in x;
  const hasAttributes = "attributes" in x;
  const hasMetadata = "metadata" in x;
  const hasLinkedItemRequests = "linkedItemRequests" in x;
  const hasLinkedItems = "linkedItems" in x;

  return (
    hasType &&
    hasUniqueAttribute &&
    hasScope &&
    hasAttributes &&
    hasMetadata &&
    hasLinkedItemRequests &&
    hasLinkedItems
  );
}

function isEdgeData(x: any): x is EdgeData {
  const hasFrom = "from" in x;
  const hasTo = "to" in x;

  return hasFrom && hasTo;
}

function isItemRequestErrorData(x: any): x is ItemRequestErrorData {
  const hasScope = "scope" in x;
  const hasErrorString = "errorString" in x;
  const hasErrorType = "errorType" in x;

  return hasScope && hasErrorString && hasErrorType;
}

function isGatewayRequestStatusData(x: any): x is GatewayRequestStatusData {
  const hasResponderStates = "responderStates" in x;
  const hasSummary = "summary" in x;
  const hasPostProcessingComplete = "postProcessingComplete" in x;

  return hasResponderStates && hasSummary && hasPostProcessingComplete;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Util {
  /**
   * Generates a new random UUID
   * @returns A new UUIDv4 as a Uint8Array
   */
  export function newUUID(): Uint8Array {
    return Uint8Array.from(uuidParse(uuidv4()));
  }

  /**
   * Generates a new random UUID
   * @returns A new UUID as a string
   */
  export function newUUIDString(): string {
    return uuidv4();
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
    ];

    return elements.join(".");
  }

  /**
   * **(Experimental)** Gets the unique hash for the object. Used for database uniqueness.
   * @param object The object to calculate the hash for
   * @returns The hash as a string
   */
  export function getHash(object: Reference | Item): string {
    const bytes = sha1(getGloballyuniquename(object), {
      asBytes: true,
    });

    const base32String = base32EncodeCustom(bytes);

    return base32String.substring(0, 11);
  }

  /**
   * Gets the unique attribute value of an object
   * @param object The object to get the unique attribute value for
   * @returns The unique attribute value as a string
   */
  export function getUniqueattributevalue(object: Item | Reference): string {
    if ("getUniqueattributevalue" in object) {
      return object.getUniqueattributevalue();
    } else {
      const uniqueAttribute = object.getUniqueattribute();
      const attributes = object.getAttributes();

      if (typeof attributes != "undefined") {
        const value = Util.getAttributeValue(attributes, uniqueAttribute);
        return String(value);
      } else {
        return "";
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
    const object = attributes.getAttrstruct()?.toJavaScript();

    if (typeof object === "undefined") {
      return undefined;
    } else {
      return object[name];
    }
  }

  /**
   * Returns a reference to the supplied item
   * @param item The item that you want a reference to
   * @returns A reference to the supplied item
   */
  export function getReference(item: Item): Reference {
    const ref = new Reference();

    ref.setScope(item.getScope());
    ref.setType(item.getType());
    ref.setUniqueattributevalue(getUniqueattributevalue(item));

    return ref;
  }

  /**
   * Convert a durationpb to javascript Date object
   * @param duration The duration object to convert
   * @returns A javascript `Date` object
   */
  export function toDate(duration: Duration): Date {
    return new Date(toMs(duration));
  }

  /**
   * Converts a number of milliseconds to a duration
   * @param ms The number of milliseconds
   */
  export function toDuration(ms: number): Duration {
    const d = new Duration();
    d.setSeconds(Math.floor(ms / 1000));
    d.setNanos((ms % 1000) * 1000000);
    return d;
  }

  export function toMs(duration: Duration): number {
    return duration.getSeconds() * 1000 + duration.getNanos() / 1_000_000;
  }

  /**
   * Create a new `Item` object from a single object
   * @param details The details of the item you want to create
   * @returns A new Item object
   */
  export function newItem(details: ItemData): Item {
    const item = new Item();

    item.setType(details.type);
    item.setUniqueattribute(details.uniqueAttribute);
    item.setScope(details.scope);
    item.setAttributes(details.attributes);

    if (typeof details.metadata != "undefined") {
      item.setMetadata(details.metadata);
    }

    item.setLinkeditemrequestsList(details.linkedItemRequests);
    item.setLinkeditemsList(details.linkedItems);

    return item;
  }

  /**
   * Creates a new ItemAttributes object from any javascript object that has
   * string keys
   * @param value Any object with string keys
   * @returns A new ItemAttributes object
   */
  export function newItemAttributes(value: {
    [key: string]: JavaScriptValue;
  }): ItemAttributes {
    const attributes = new ItemAttributes();
    attributes.setAttrstruct(Struct.fromJavaScript(value));

    return attributes;
  }

  export type MetadataData = {
    sourceName: string;
    sourceRequest: ItemRequestData;
    timestamp: Date;
    sourceDuration: number; // milliseconds
    sourceDurationPerItem: number; // milliseconds
  };

  /**
   * Creates a new `Metadata` object from a object
   * @param data The metadata you want the new object to have
   * @returns A new Metadata object
   */
  export function newMetadata(data: MetadataData): Metadata {
    const m = new Metadata();

    m.setSourcename(data.sourceName);
    m.setSourcerequest(Util.newItemRequest(data.sourceRequest));

    const timestamp = new Timestamp();
    timestamp.fromDate(data.timestamp);
    m.setTimestamp(timestamp);

    const sourceDuration = new Duration();
    sourceDuration.setSeconds(Math.floor(data.sourceDuration / 1000));
    sourceDuration.setNanos((data.sourceDuration % 1000) * 1e6);
    m.setSourceduration(sourceDuration);

    const sourceDurationPerItem = new Duration();
    sourceDurationPerItem.setSeconds(
      Math.floor(data.sourceDurationPerItem / 1000)
    );
    sourceDurationPerItem.setNanos((data.sourceDurationPerItem % 1000) * 1e6);
    m.setSourcedurationperitem(sourceDurationPerItem);

    return m;
  }

  /**
   * Creates a new ItemRequestError from a single object
   * @param details The details of the error to create
   * @returns The new error object
   */
  export function newItemRequestError(
    details: ItemRequestErrorData
  ): ItemRequestError {
    const err = new ItemRequestError();

    err.setScope(details.scope);
    err.setErrorstring(details.errorString);
    err.setErrortype(details.errorType);

    return err;
  }

  export type ItemRequestData = {
    type: string;
    method: "GET" | "LIST" | "SEARCH";
    query: string;
    linkDepth: number;
    scope: string;
    UUID: string | Uint8Array;
    itemSubject?: string;
    responseSubject?: string;
    errorSubject?: string;
    timeoutMs?: number;
  };

  /**
   * Creates a new ItemRequest object from a single object
   * @param details The details that you want the new ItemRequest to have
   * @returns A new ItemRequest object
   */
  export function newItemRequest(details: ItemRequestData): ItemRequest {
    const r = new ItemRequest();

    r.setType(details.type);
    r.setMethod(convertRequestMethod(details.method));
    r.setQuery(details.query);
    r.setLinkdepth(details.linkDepth);
    r.setScope(details.scope);
    r.setItemsubject(details.itemSubject || "");
    r.setResponsesubject(details.responseSubject || "");
    r.setErrorsubject(details.errorSubject || "");

    if (typeof details.UUID == "string") {
      r.setUuid(Uint8Array.from(uuidParse(details.UUID)));
    } else {
      r.setUuid(details.UUID);
    }

    if (typeof details.timeoutMs != "undefined") {
      r.setTimeout(Util.toDuration(details.timeoutMs));
    }

    return r;
  }

  /**
   * Create a new Reference from a single object
   * @param details The details that you want the new reference to contain
   * @returns The new Reference object
   */
  export function newReference(details: ReferenceData): Reference {
    const r = new Reference();

    r.setType(details.type);
    r.setUniqueattributevalue(details.uniqueAttributeValue);
    r.setScope(details.scope);

    return r;
  }

  export type ResponseData = {
    responder: string;
    state: ResponderState;
    nextUpdateInMs?: number;
  };

  /**
   * Creates a new Response object from a single object
   * @param details The details you want the new Response object to have
   * @returns The new Response object
   */
  export function newResponse(details: ResponseData): Response {
    const r = new Response();

    r.setResponder(details.responder);
    r.setState(details.state);

    if (typeof details.nextUpdateInMs != "undefined") {
      r.setNextupdatein(Util.toDuration(details.nextUpdateInMs));
    }

    return r;
  }

  export type CancelItemRequestData = {
    UUID: string | Uint8Array;
  };

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
    const c = new CancelItemRequest();

    if (typeof details.UUID == "string") {
      const buffer = uuidParse(details.UUID);
      c.setUuid(Uint8Array.from(buffer));
    } else {
      c.setUuid(details.UUID);
    }

    return c;
  }

  /**
   * Creates a new Edge object
   * @param data Data to be used in the object
   * @returns A new Edge object
   */
  export function newEdge(data: EdgeData): Edge {
    const e = new Edge();

    e.setFrom(Util.newReference(data.from));
    e.setTo(Util.newReference(data.to));

    return e;
  }

  export function newGatewayRequestStatus(
    data: GatewayRequestStatusData
  ): GatewayRequestStatus {
    const grs = new GatewayRequestStatus();
    const responders = grs.getResponderstatesMap();
    const summary = new GatewayRequestStatus.Summary();

    for (const [responder, state] of data.responderStates) {
      responders.set(responder, state);
    }

    summary.setWorking(data.summary.working);
    summary.setStalled(data.summary.stalled);
    summary.setComplete(data.summary.complete);
    summary.setError(data.summary.error);
    summary.setCancelled(data.summary.cancelled);
    summary.setResponders(data.summary.responders);
    grs.setSummary(summary);

    grs.setPostprocessingcomplete(data.postProcessingComplete);

    return grs;
  }

  /**
   * Creates a new GatewayRequest object. This is an abstraction that wraps
   * either an ItemRequest or a CancelItemRequest, along with a timeout
   * @param request The ItemRequest or CancelItemRequest to send
   * @param minStatusIntervalMs The minimum duration between status responses
   * @returns A new GatewayRequest
   */
  export function newGatewayRequest(
    request: ItemRequestData | CancelItemRequestData,
    minStatusIntervalMs: number
  ): GatewayRequest {
    const gr = new GatewayRequest();

    if ("method" in request) {
      const ir = Util.newItemRequest(request);
      gr.setRequest(ir);
    } else {
      const cancel = Util.newCancelItemRequest(request);
      gr.setCancel(cancel);
    }

    if (minStatusIntervalMs > 0) {
      gr.setMinstatusinterval(Util.toDuration(minStatusIntervalMs));
    }

    return gr;
  }

  /**
   * Checks if a gateway request is done, this means that there are no more
   * responders working and all post-processing is complete
   * @param g The GatewayRequestStatus to check
   * @returns True of the request is done, false otherwise
   */
  export function gatewayRequestStatusDone(g: GatewayRequestStatus): boolean {
    const summary = g.getSummary();

    if (typeof summary != "undefined") {
      return g.getPostprocessingcomplete() && summary.getWorking() == 0;
    }

    return false;
  }

  export type GatewayResponseData =
    | ItemData
    | EdgeData
    | ItemRequestErrorData
    | GatewayRequestStatusData
    | string;

  export function newGatewayResponse(
    data: GatewayResponseData
  ): GatewayResponse {
    const gr = new GatewayResponse();

    if (typeof data == "string") {
      gr.setError(data);
      return gr;
    } else if (typeof data == "object") {
      if (isItemData(data)) {
        gr.setNewitem(Util.newItem(data));
        return gr;
      }

      if (isEdgeData(data)) {
        gr.setNewedge(Util.newEdge(data));
        return gr;
      }

      if (isItemRequestErrorData(data)) {
        gr.setNewitemrequesterror(Util.newItemRequestError(data));
        return gr;
      }

      if (isGatewayRequestStatusData(data)) {
        gr.setStatus(Util.newGatewayRequestStatus(data));
        return gr;
      }
    }

    return gr;
  }
}
