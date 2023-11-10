// @generated by protoc-gen-es v1.4.2 with parameter "target=ts,import_extension=.ts"
// @generated from file responses.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Duration, Message, proto3 } from "@bufbuild/protobuf";

/**
 * ResponderState represents the state of the responder, note that both
 * COMPLETE and ERROR are completion states i.e. do not expect any more items
 * to be returned from the query
 *
 * @generated from enum ResponderState
 */
export enum ResponderState {
  /**
   * The responder is still gathering data
   *
   * @generated from enum value: WORKING = 0;
   */
  WORKING = 0,

  /**
   * The query is complete
   *
   * @generated from enum value: COMPLETE = 1;
   */
  COMPLETE = 1,

  /**
   * All sources have returned errors
   *
   * @generated from enum value: ERROR = 2;
   */
  ERROR = 2,

  /**
   * Work has been cancelled while in progress
   *
   * @generated from enum value: CANCELLED = 3;
   */
  CANCELLED = 3,

  /**
   * The responder has not set a response in the expected interval
   *
   * @generated from enum value: STALLED = 4;
   */
  STALLED = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(ResponderState)
proto3.util.setEnumType(ResponderState, "ResponderState", [
  { no: 0, name: "WORKING" },
  { no: 1, name: "COMPLETE" },
  { no: 2, name: "ERROR" },
  { no: 3, name: "CANCELLED" },
  { no: 4, name: "STALLED" },
]);

/**
 * Response is returned when a query is made
 *
 * @generated from message Response
 */
export class Response extends Message<Response> {
  /**
   * The name of the responder that is working on a response. This is purely
   * informational
   *
   * @generated from field: string responder = 1;
   */
  responder = "";

  /**
   * The state of the responder
   *
   * @generated from field: ResponderState state = 2;
   */
  state = ResponderState.WORKING;

  /**
   * The timespan within which to expect the next update. (e.g. 10s) If no
   * further interim responses are received within this time the connection
   * can be considered stale and the requester may give up
   *
   * @generated from field: google.protobuf.Duration nextUpdateIn = 3;
   */
  nextUpdateIn?: Duration;

  /**
   * UUID of the item query that this response is in relation to (in binary
   * format)
   *
   * @generated from field: bytes UUID = 4;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<Response>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "Response";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "responder", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "state", kind: "enum", T: proto3.getEnumType(ResponderState) },
    { no: 3, name: "nextUpdateIn", kind: "message", T: Duration },
    { no: 4, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Response {
    return new Response().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Response {
    return new Response().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Response {
    return new Response().fromJsonString(jsonString, options);
  }

  static equals(a: Response | PlainMessage<Response> | undefined, b: Response | PlainMessage<Response> | undefined): boolean {
    return proto3.util.equals(Response, a, b);
  }
}

