// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file gateway.proto (package gateway, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { ChangeStatus } from "./changes_pb";
import { file_changes } from "./changes_pb";
import type { CancelQuery, Edge, Expand, Item, Query, QueryError, QueryMethod, QueryStatus, Reference, UndoExpand, UndoQuery } from "./items_pb";
import { file_items } from "./items_pb";
import type { ResponderState } from "./responses_pb";
import { file_responses } from "./responses_pb";
import type { Duration, Timestamp } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_duration, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file gateway.proto.
 */
export const file_gateway: GenFile = /*@__PURE__*/
  fileDesc("Cg1nYXRld2F5LnByb3RvEgdnYXRld2F5IvsDCg5HYXRld2F5UmVxdWVzdBIXCgVxdWVyeRgBIAEoCzIGLlF1ZXJ5SAASIwoLY2FuY2VsUXVlcnkYAyABKAsyDC5DYW5jZWxRdWVyeUgAEh8KCXVuZG9RdWVyeRgEIAEoCzIKLlVuZG9RdWVyeUgAEhkKBmV4cGFuZBgHIAEoCzIHLkV4cGFuZEgAEiEKCnVuZG9FeHBhbmQYCCABKAsyCy5VbmRvRXhwYW5kSAASLwoNc3RvcmVTbmFwc2hvdBgKIAEoCzIWLmdhdGV3YXkuU3RvcmVTbmFwc2hvdEgAEi0KDGxvYWRTbmFwc2hvdBgLIAEoCzIVLmdhdGV3YXkuTG9hZFNuYXBzaG90SAASLwoNc3RvcmVCb29rbWFyaxgOIAEoCzIWLmdhdGV3YXkuU3RvcmVCb29rbWFya0gAEi0KDGxvYWRCb29rbWFyaxgPIAEoCzIVLmdhdGV3YXkuTG9hZEJvb2ttYXJrSAASKwoLY2hhdE1lc3NhZ2UYECABKAsyFC5nYXRld2F5LkNoYXRNZXNzYWdlSAASOQoRbWluU3RhdHVzSW50ZXJ2YWwYAiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25IAYgBAUIOCgxyZXF1ZXN0X3R5cGVCFAoSX21pblN0YXR1c0ludGVydmFsIq8FCg9HYXRld2F5UmVzcG9uc2USGAoHbmV3SXRlbRgCIAEoCzIFLkl0ZW1IABIYCgduZXdFZGdlGAMgASgLMgUuRWRnZUgAEi8KBnN0YXR1cxgEIAEoCzIdLmdhdGV3YXkuR2F0ZXdheVJlcXVlc3RTdGF0dXNIABIPCgVlcnJvchgFIAEoCUgAEiEKCnF1ZXJ5RXJyb3IYBiABKAsyCy5RdWVyeUVycm9ySAASIAoKZGVsZXRlSXRlbRgHIAEoCzIKLlJlZmVyZW5jZUgAEhsKCmRlbGV0ZUVkZ2UYCCABKAsyBS5FZGdlSAASGwoKdXBkYXRlSXRlbRgJIAEoCzIFLkl0ZW1IABI7ChNzbmFwc2hvdFN0b3JlUmVzdWx0GAsgASgLMhwuZ2F0ZXdheS5TbmFwc2hvdFN0b3JlUmVzdWx0SAASOQoSc25hcHNob3RMb2FkUmVzdWx0GAwgASgLMhsuZ2F0ZXdheS5TbmFwc2hvdExvYWRSZXN1bHRIABI7ChNib29rbWFya1N0b3JlUmVzdWx0GA8gASgLMhwuZ2F0ZXdheS5Cb29rbWFya1N0b3JlUmVzdWx0SAASOQoSYm9va21hcmtMb2FkUmVzdWx0GBAgASgLMhsuZ2F0ZXdheS5Cb29rbWFya0xvYWRSZXN1bHRIABIjCgtxdWVyeVN0YXR1cxgRIAEoCzIMLlF1ZXJ5U3RhdHVzSAASLQoMY2hhdFJlc3BvbnNlGBIgASgLMhUuZ2F0ZXdheS5DaGF0UmVzcG9uc2VIABInCgl0b29sU3RhcnQYEyABKAsyEi5nYXRld2F5LlRvb2xTdGFydEgAEikKCnRvb2xGaW5pc2gYFCABKAsyEy5nYXRld2F5LlRvb2xGaW5pc2hIAEIPCg1yZXNwb25zZV90eXBlIvkCChRHYXRld2F5UmVxdWVzdFN0YXR1cxJLCg9yZXNwb25kZXJTdGF0ZXMYASADKAsyMi5nYXRld2F5LkdhdGV3YXlSZXF1ZXN0U3RhdHVzLlJlc3BvbmRlclN0YXRlc0VudHJ5EjYKB3N1bW1hcnkYAyABKAsyJS5nYXRld2F5LkdhdGV3YXlSZXF1ZXN0U3RhdHVzLlN1bW1hcnkSHgoWcG9zdFByb2Nlc3NpbmdDb21wbGV0ZRgEIAEoCBpHChRSZXNwb25kZXJTdGF0ZXNFbnRyeRILCgNrZXkYASABKAkSHgoFdmFsdWUYAiABKA4yDy5SZXNwb25kZXJTdGF0ZToCOAEacwoHU3VtbWFyeRIPCgd3b3JraW5nGAEgASgFEg8KB3N0YWxsZWQYAiABKAUSEAoIY29tcGxldGUYAyABKAUSDQoFZXJyb3IYBCABKAUSEQoJY2FuY2VsbGVkGAUgASgFEhIKCnJlc3BvbmRlcnMYBiABKAUiUwoNU3RvcmVCb29rbWFyaxIMCgRuYW1lGAEgASgJEhMKC2Rlc2NyaXB0aW9uGAIgASgJEg0KBW1zZ0lEGAMgASgMEhAKCGlzU3lzdGVtGAQgASgIImUKE0Jvb2ttYXJrU3RvcmVSZXN1bHQSDwoHc3VjY2VzcxgBIAEoCBIUCgxlcnJvck1lc3NhZ2UYAiABKAkSDQoFbXNnSUQYBCABKAwSEgoKYm9va21hcmtJRBgFIAEoDEoECAMQBCJuCgxMb2FkQm9va21hcmsSDAoEVVVJRBgBIAEoDBINCgVtc2dJRBgCIAEoDBITCgtpZ25vcmVDYWNoZRgDIAEoCBIsCghkZWFkbGluZRgEIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiZQoSQm9va21hcmtMb2FkUmVzdWx0Eg8KB3N1Y2Nlc3MYASABKAgSFAoMZXJyb3JNZXNzYWdlGAIgASgJEhkKEXN0YXJ0ZWRRdWVyeVVVSURzGAMgAygMEg0KBW1zZ0lEGAQgASgMIkEKDVN0b3JlU25hcHNob3QSDAoEbmFtZRgBIAEoCRITCgtkZXNjcmlwdGlvbhgCIAEoCRINCgVtc2dJRBgDIAEoDCJlChNTbmFwc2hvdFN0b3JlUmVzdWx0Eg8KB3N1Y2Nlc3MYASABKAgSFAoMZXJyb3JNZXNzYWdlGAIgASgJEg0KBW1zZ0lEGAQgASgMEhIKCnNuYXBzaG90SUQYBSABKAxKBAgDEAQiKwoMTG9hZFNuYXBzaG90EgwKBFVVSUQYASABKAwSDQoFbXNnSUQYAiABKAwiSgoSU25hcHNob3RMb2FkUmVzdWx0Eg8KB3N1Y2Nlc3MYASABKAgSFAoMZXJyb3JNZXNzYWdlGAIgASgJEg0KBW1zZ0lEGAQgASgMIj8KC0NoYXRNZXNzYWdlEg4KBHRleHQYASABKAlIABIQCgZjYW5jZWwYAiABKAhIAEIOCgxyZXF1ZXN0X3R5cGUiGgoMVG9vbE1ldGFkYXRhEgoKAmlkGAEgASgJIloKDlF1ZXJ5VG9vbFN0YXJ0EgwKBHR5cGUYASABKAkSHAoGbWV0aG9kGAIgASgOMgwuUXVlcnlNZXRob2QSDQoFcXVlcnkYAyABKAkSDQoFc2NvcGUYBCABKAkiIwoPUXVlcnlUb29sRmluaXNoEhAKCG51bUl0ZW1zGAEgASgFIlIKFVJlbGF0aW9uc2hpcFRvb2xTdGFydBIMCgR0eXBlGAEgASgJEhwKFHVuaXF1ZUF0dHJpYnV0ZVZhbHVlGAIgASgJEg0KBXNjb3BlGAMgASgJIioKFlJlbGF0aW9uc2hpcFRvb2xGaW5pc2gSEAoIbnVtSXRlbXMYASABKAUiWAobQ2hhbmdlc0J5UmVmZXJlbmNlVG9vbFN0YXJ0EgwKBHR5cGUYASABKAkSHAoUdW5pcXVlQXR0cmlidXRlVmFsdWUYAiABKAkSDQoFc2NvcGUYAyABKAkivAEKGENoYW5nZUJ5UmVmZXJlbmNlU3VtbWFyeRINCgV0aXRsZRgBIAEoCRIMCgRVVUlEGAIgASgMEi0KCWNyZWF0ZWRBdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASDQoFb3duZXIYBCABKAkSGAoQbnVtQWZmZWN0ZWRJdGVtcxgFIAEoBRIrCgxjaGFuZ2VTdGF0dXMYBiABKA4yFS5jaGFuZ2VzLkNoYW5nZVN0YXR1cyJaChxDaGFuZ2VzQnlSZWZlcmVuY2VUb29sRmluaXNoEjoKD2NoYW5nZVN1bW1hcmllcxgBIAMoCzIhLmdhdGV3YXkuQ2hhbmdlQnlSZWZlcmVuY2VTdW1tYXJ5IucBCglUb29sU3RhcnQSJwoIbWV0YWRhdGEYASABKAsyFS5nYXRld2F5LlRvb2xNZXRhZGF0YRIoCgVxdWVyeRgCIAEoCzIXLmdhdGV3YXkuUXVlcnlUb29sU3RhcnRIABI2CgxyZWxhdGlvbnNoaXAYAyABKAsyHi5nYXRld2F5LlJlbGF0aW9uc2hpcFRvb2xTdGFydEgAEkIKEmNoYW5nZXNCeVJlZmVyZW5jZRgEIAEoCzIkLmdhdGV3YXkuQ2hhbmdlc0J5UmVmZXJlbmNlVG9vbFN0YXJ0SABCCwoJdG9vbF90eXBlIvoBCgpUb29sRmluaXNoEicKCG1ldGFkYXRhGAEgASgLMhUuZ2F0ZXdheS5Ub29sTWV0YWRhdGESDQoFZXJyb3IYAiABKAkSKQoFcXVlcnkYAyABKAsyGC5nYXRld2F5LlF1ZXJ5VG9vbEZpbmlzaEgAEjcKDHJlbGF0aW9uc2hpcBgEIAEoCzIfLmdhdGV3YXkuUmVsYXRpb25zaGlwVG9vbEZpbmlzaEgAEkMKEmNoYW5nZXNCeVJlZmVyZW5jZRgFIAEoCzIlLmdhdGV3YXkuQ2hhbmdlc0J5UmVmZXJlbmNlVG9vbEZpbmlzaEgAQgsKCXRvb2xfdHlwZSIrCgxDaGF0UmVzcG9uc2USDAoEdGV4dBgBIAEoCRINCgVlcnJvchgCIAEoCUIkWiJnaXRodWIuY29tL292ZXJtaW5kdGVjaC9zZHAtZ287c2RwYgZwcm90bzM", [file_changes, file_items, file_responses, file_google_protobuf_duration, file_google_protobuf_timestamp]);

/**
 * A union of all request made to the gateway.
 *
 * @generated from message gateway.GatewayRequest
 */
export type GatewayRequest = Message<"gateway.GatewayRequest"> & {
  /**
   * @generated from oneof gateway.GatewayRequest.request_type
   */
  requestType: {
    /**
     * Adds a new query for items to the session, starting it immediately
     *
     * @generated from field: Query query = 1;
     */
    value: Query;
    case: "query";
  } | {
    /**
     * Cancel a running query
     *
     * @generated from field: CancelQuery cancelQuery = 3;
     */
    value: CancelQuery;
    case: "cancelQuery";
  } | {
    /**
     * Undo the specified query, if it was the last query received by the gateway. This removes it and all of its effects from the session
     *
     * @generated from field: UndoQuery undoQuery = 4;
     */
    value: UndoQuery;
    case: "undoQuery";
  } | {
    /**
     * Expand all linked items for the given item
     *
     * @generated from field: Expand expand = 7;
     */
    value: Expand;
    case: "expand";
  } | {
    /**
     * Undo the specified item expansion
     *
     * TODO: CancelExpand?
     *
     * @generated from field: UndoExpand undoExpand = 8;
     */
    value: UndoExpand;
    case: "undoExpand";
  } | {
    /**
     * store the current session state as snapshot
     *
     * @generated from field: gateway.StoreSnapshot storeSnapshot = 10;
     */
    value: StoreSnapshot;
    case: "storeSnapshot";
  } | {
    /**
     * load a snapshot into the current state
     *
     * TODO: implement?
     * // cancel the loading of a snapshot
     * CancelLoadSnapshot cancelLoadSnapshot = ??;
     * // undo the loading of a snapshot
     * UndoLoadSnapshot undoLoadSnapshot = ??;
     *
     * @generated from field: gateway.LoadSnapshot loadSnapshot = 11;
     */
    value: LoadSnapshot;
    case: "loadSnapshot";
  } | {
    /**
     * store the current set of queries as bookmarks
     *
     * @generated from field: gateway.StoreBookmark storeBookmark = 14;
     */
    value: StoreBookmark;
    case: "storeBookmark";
  } | {
    /**
     * load and execute a bookmark into the current state
     *
     * @generated from field: gateway.LoadBookmark loadBookmark = 15;
     */
    value: LoadBookmark;
    case: "loadBookmark";
  } | {
    /**
     * // cancel the loading of a Bookmark
     * CancelLoadBookmark cancelLoadBookmark = ??;
     * // undo the loading of a Bookmark
     * UndoLoadBookmark undoLoadBookmark = ??;
     *
     * @generated from field: gateway.ChatMessage chatMessage = 16;
     */
    value: ChatMessage;
    case: "chatMessage";
  } | { case: undefined; value?: undefined };

  /**
   * Minimum time between status updates. Setting this value too low can result in too many status messages
   *
   * @generated from field: optional google.protobuf.Duration minStatusInterval = 2;
   */
  minStatusInterval?: Duration;
};

/**
 * Describes the message gateway.GatewayRequest.
 * Use `create(GatewayRequestSchema)` to create a new message.
 */
export const GatewayRequestSchema: GenMessage<GatewayRequest> = /*@__PURE__*/
  messageDesc(file_gateway, 0);

/**
 * The gateway will always respond with this type of message,
 * however the purpose of it is purely as a wrapper to the many different types
 * of messages that the gateway can send
 *
 * @generated from message gateway.GatewayResponse
 */
export type GatewayResponse = Message<"gateway.GatewayResponse"> & {
  /**
   * @generated from oneof gateway.GatewayResponse.response_type
   */
  responseType: {
    /**
     * A new item that has been discovered
     *
     * @generated from field: Item newItem = 2;
     */
    value: Item;
    case: "newItem";
  } | {
    /**
     * A new edge between two items
     *
     * @generated from field: Edge newEdge = 3;
     */
    value: Edge;
    case: "newEdge";
  } | {
    /**
     * Status of the overall request
     *
     * @generated from field: gateway.GatewayRequestStatus status = 4;
     */
    value: GatewayRequestStatus;
    case: "status";
  } | {
    /**
     * An error that means the request couldn't be executed
     *
     * @generated from field: string error = 5;
     */
    value: string;
    case: "error";
  } | {
    /**
     * A new error that was encountered as part of a query
     *
     * @generated from field: QueryError queryError = 6;
     */
    value: QueryError;
    case: "queryError";
  } | {
    /**
     * An item that should be deleted from local state
     *
     * @generated from field: Reference deleteItem = 7;
     */
    value: Reference;
    case: "deleteItem";
  } | {
    /**
     * An edge that should be deleted form local state
     *
     * @generated from field: Edge deleteEdge = 8;
     */
    value: Edge;
    case: "deleteEdge";
  } | {
    /**
     * An item that has already been sent, but contains new data, it should be updated to reflect this version
     *
     * @generated from field: Item updateItem = 9;
     */
    value: Item;
    case: "updateItem";
  } | {
    /**
     * @generated from field: gateway.SnapshotStoreResult snapshotStoreResult = 11;
     */
    value: SnapshotStoreResult;
    case: "snapshotStoreResult";
  } | {
    /**
     * @generated from field: gateway.SnapshotLoadResult snapshotLoadResult = 12;
     */
    value: SnapshotLoadResult;
    case: "snapshotLoadResult";
  } | {
    /**
     * @generated from field: gateway.BookmarkStoreResult bookmarkStoreResult = 15;
     */
    value: BookmarkStoreResult;
    case: "bookmarkStoreResult";
  } | {
    /**
     * @generated from field: gateway.BookmarkLoadResult bookmarkLoadResult = 16;
     */
    value: BookmarkLoadResult;
    case: "bookmarkLoadResult";
  } | {
    /**
     * Status of requested queries
     *
     * @generated from field: QueryStatus queryStatus = 17;
     */
    value: QueryStatus;
    case: "queryStatus";
  } | {
    /**
     * @generated from field: gateway.ChatResponse chatResponse = 18;
     */
    value: ChatResponse;
    case: "chatResponse";
  } | {
    /**
     * @generated from field: gateway.ToolStart toolStart = 19;
     */
    value: ToolStart;
    case: "toolStart";
  } | {
    /**
     * @generated from field: gateway.ToolFinish toolFinish = 20;
     */
    value: ToolFinish;
    case: "toolFinish";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message gateway.GatewayResponse.
 * Use `create(GatewayResponseSchema)` to create a new message.
 */
export const GatewayResponseSchema: GenMessage<GatewayResponse> = /*@__PURE__*/
  messageDesc(file_gateway, 1);

/**
 * Contains the status of the gateway request.
 *
 * @generated from message gateway.GatewayRequestStatus
 */
export type GatewayRequestStatus = Message<"gateway.GatewayRequestStatus"> & {
  /**
   * @generated from field: map<string, ResponderState> responderStates = 1;
   */
  responderStates: { [key: string]: ResponderState };

  /**
   * @generated from field: gateway.GatewayRequestStatus.Summary summary = 3;
   */
  summary?: GatewayRequestStatus_Summary;

  /**
   * Whether all items have finished being processed by the gateway. It is
   * possible for all responders to be complete, but the gateway is still
   * working. A request should only be considered complete when all working ==
   * 0 and postProcessingComplete == true
   *
   * @generated from field: bool postProcessingComplete = 4;
   */
  postProcessingComplete: boolean;
};

/**
 * Describes the message gateway.GatewayRequestStatus.
 * Use `create(GatewayRequestStatusSchema)` to create a new message.
 */
export const GatewayRequestStatusSchema: GenMessage<GatewayRequestStatus> = /*@__PURE__*/
  messageDesc(file_gateway, 2);

/**
 * @generated from message gateway.GatewayRequestStatus.Summary
 */
export type GatewayRequestStatus_Summary = Message<"gateway.GatewayRequestStatus.Summary"> & {
  /**
   * @generated from field: int32 working = 1;
   */
  working: number;

  /**
   * @generated from field: int32 stalled = 2;
   */
  stalled: number;

  /**
   * @generated from field: int32 complete = 3;
   */
  complete: number;

  /**
   * @generated from field: int32 error = 4;
   */
  error: number;

  /**
   * @generated from field: int32 cancelled = 5;
   */
  cancelled: number;

  /**
   * @generated from field: int32 responders = 6;
   */
  responders: number;
};

/**
 * Describes the message gateway.GatewayRequestStatus.Summary.
 * Use `create(GatewayRequestStatus_SummarySchema)` to create a new message.
 */
export const GatewayRequestStatus_SummarySchema: GenMessage<GatewayRequestStatus_Summary> = /*@__PURE__*/
  messageDesc(file_gateway, 2, 0);

/**
 * Ask the gateway to store the current state as bookmark with the specified details.
 * Returns a BookmarkStored message when the bookmark is stored
 *
 * @generated from message gateway.StoreBookmark
 */
export type StoreBookmark = Message<"gateway.StoreBookmark"> & {
  /**
   * user supplied name of this bookmark
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * user supplied description of this bookmark
   *
   * @generated from field: string description = 2;
   */
  description: string;

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 3;
   */
  msgID: Uint8Array;

  /**
   * whether this bookmark should be stored as a system bookmark. System
   * bookmarks are hidden and can only be returned via the UUID, they don't
   * show up in lists
   *
   * @generated from field: bool isSystem = 4;
   */
  isSystem: boolean;
};

/**
 * Describes the message gateway.StoreBookmark.
 * Use `create(StoreBookmarkSchema)` to create a new message.
 */
export const StoreBookmarkSchema: GenMessage<StoreBookmark> = /*@__PURE__*/
  messageDesc(file_gateway, 3);

/**
 * After a bookmark is successfully stored, this reply with the new bookmark's details is sent.
 *
 * @generated from message gateway.BookmarkStoreResult
 */
export type BookmarkStoreResult = Message<"gateway.BookmarkStoreResult"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage: string;

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID: Uint8Array;

  /**
   * UUID of the newly created bookmark
   *
   * @generated from field: bytes bookmarkID = 5;
   */
  bookmarkID: Uint8Array;
};

/**
 * Describes the message gateway.BookmarkStoreResult.
 * Use `create(BookmarkStoreResultSchema)` to create a new message.
 */
export const BookmarkStoreResultSchema: GenMessage<BookmarkStoreResult> = /*@__PURE__*/
  messageDesc(file_gateway, 4);

/**
 * Ask the gateway to load the specified bookmark into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message gateway.LoadBookmark
 */
export type LoadBookmark = Message<"gateway.LoadBookmark"> & {
  /**
   * unique id of the bookmark to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID: Uint8Array;

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 2;
   */
  msgID: Uint8Array;

  /**
   * set to true to force fetching fresh data
   *
   * @generated from field: bool ignoreCache = 3;
   */
  ignoreCache: boolean;

  /**
   * The time at which the gateway should stop processing the queries spawned by this request
   *
   * @generated from field: google.protobuf.Timestamp deadline = 4;
   */
  deadline?: Timestamp;
};

/**
 * Describes the message gateway.LoadBookmark.
 * Use `create(LoadBookmarkSchema)` to create a new message.
 */
export const LoadBookmarkSchema: GenMessage<LoadBookmark> = /*@__PURE__*/
  messageDesc(file_gateway, 5);

/**
 * @generated from message gateway.BookmarkLoadResult
 */
export type BookmarkLoadResult = Message<"gateway.BookmarkLoadResult"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage: string;

  /**
   * UUIDs of all queries that have been started as a result of loading this bookmark
   *
   * @generated from field: repeated bytes startedQueryUUIDs = 3;
   */
  startedQueryUUIDs: Uint8Array[];

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID: Uint8Array;
};

/**
 * Describes the message gateway.BookmarkLoadResult.
 * Use `create(BookmarkLoadResultSchema)` to create a new message.
 */
export const BookmarkLoadResultSchema: GenMessage<BookmarkLoadResult> = /*@__PURE__*/
  messageDesc(file_gateway, 6);

/**
 * Ask the gateway to store the current state as snapshot with the specified details.
 * Returns a SnapshotStored message when the snapshot is stored
 *
 * @generated from message gateway.StoreSnapshot
 */
export type StoreSnapshot = Message<"gateway.StoreSnapshot"> & {
  /**
   * user supplied name of this snapshot
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * user supplied description of this snapshot
   *
   * @generated from field: string description = 2;
   */
  description: string;

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 3;
   */
  msgID: Uint8Array;
};

/**
 * Describes the message gateway.StoreSnapshot.
 * Use `create(StoreSnapshotSchema)` to create a new message.
 */
export const StoreSnapshotSchema: GenMessage<StoreSnapshot> = /*@__PURE__*/
  messageDesc(file_gateway, 7);

/**
 * After a snapshot is successfully stored, this reply with the new snapshot's details is sent.
 *
 * @generated from message gateway.SnapshotStoreResult
 */
export type SnapshotStoreResult = Message<"gateway.SnapshotStoreResult"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage: string;

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID: Uint8Array;

  /**
   * The UUID of the newly stored snapshot
   *
   * @generated from field: bytes snapshotID = 5;
   */
  snapshotID: Uint8Array;
};

/**
 * Describes the message gateway.SnapshotStoreResult.
 * Use `create(SnapshotStoreResultSchema)` to create a new message.
 */
export const SnapshotStoreResultSchema: GenMessage<SnapshotStoreResult> = /*@__PURE__*/
  messageDesc(file_gateway, 8);

/**
 * Ask the gateway to load the specified snapshot into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message gateway.LoadSnapshot
 */
export type LoadSnapshot = Message<"gateway.LoadSnapshot"> & {
  /**
   * unique id of the snapshot to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID: Uint8Array;

  /**
   * a correlation ID to match up requests and responses. set this to a value unique per connection
   *
   * @generated from field: bytes msgID = 2;
   */
  msgID: Uint8Array;
};

/**
 * Describes the message gateway.LoadSnapshot.
 * Use `create(LoadSnapshotSchema)` to create a new message.
 */
export const LoadSnapshotSchema: GenMessage<LoadSnapshot> = /*@__PURE__*/
  messageDesc(file_gateway, 9);

/**
 * @generated from message gateway.SnapshotLoadResult
 */
export type SnapshotLoadResult = Message<"gateway.SnapshotLoadResult"> & {
  /**
   * @generated from field: bool success = 1;
   */
  success: boolean;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage: string;

  /**
   * a correlation ID to match up requests and responses. this field returns the contents of the request's msgID
   *
   * @generated from field: bytes msgID = 4;
   */
  msgID: Uint8Array;
};

/**
 * Describes the message gateway.SnapshotLoadResult.
 * Use `create(SnapshotLoadResultSchema)` to create a new message.
 */
export const SnapshotLoadResultSchema: GenMessage<SnapshotLoadResult> = /*@__PURE__*/
  messageDesc(file_gateway, 10);

/**
 * @generated from message gateway.ChatMessage
 */
export type ChatMessage = Message<"gateway.ChatMessage"> & {
  /**
   * The message to create
   *
   * @generated from oneof gateway.ChatMessage.request_type
   */
  requestType: {
    /**
     * @generated from field: string text = 1;
     */
    value: string;
    case: "text";
  } | {
    /**
     * Cancel the last message sent to openAI, includes the message and tools that were started
     *
     * @generated from field: bool cancel = 2;
     */
    value: boolean;
    case: "cancel";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message gateway.ChatMessage.
 * Use `create(ChatMessageSchema)` to create a new message.
 */
export const ChatMessageSchema: GenMessage<ChatMessage> = /*@__PURE__*/
  messageDesc(file_gateway, 11);

/**
 * @generated from message gateway.ToolMetadata
 */
export type ToolMetadata = Message<"gateway.ToolMetadata"> & {
  /**
   * A unique ID that tracks this tool call and can be used to correlate messages
   *
   * @generated from field: string id = 1;
   */
  id: string;
};

/**
 * Describes the message gateway.ToolMetadata.
 * Use `create(ToolMetadataSchema)` to create a new message.
 */
export const ToolMetadataSchema: GenMessage<ToolMetadata> = /*@__PURE__*/
  messageDesc(file_gateway, 12);

/**
 * @generated from message gateway.QueryToolStart
 */
export type QueryToolStart = Message<"gateway.QueryToolStart"> & {
  /**
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * @generated from field: QueryMethod method = 2;
   */
  method: QueryMethod;

  /**
   * @generated from field: string query = 3;
   */
  query: string;

  /**
   * @generated from field: string scope = 4;
   */
  scope: string;
};

/**
 * Describes the message gateway.QueryToolStart.
 * Use `create(QueryToolStartSchema)` to create a new message.
 */
export const QueryToolStartSchema: GenMessage<QueryToolStart> = /*@__PURE__*/
  messageDesc(file_gateway, 13);

/**
 * @generated from message gateway.QueryToolFinish
 */
export type QueryToolFinish = Message<"gateway.QueryToolFinish"> & {
  /**
   * @generated from field: int32 numItems = 1;
   */
  numItems: number;
};

/**
 * Describes the message gateway.QueryToolFinish.
 * Use `create(QueryToolFinishSchema)` to create a new message.
 */
export const QueryToolFinishSchema: GenMessage<QueryToolFinish> = /*@__PURE__*/
  messageDesc(file_gateway, 14);

/**
 * @generated from message gateway.RelationshipToolStart
 */
export type RelationshipToolStart = Message<"gateway.RelationshipToolStart"> & {
  /**
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * @generated from field: string uniqueAttributeValue = 2;
   */
  uniqueAttributeValue: string;

  /**
   * @generated from field: string scope = 3;
   */
  scope: string;
};

/**
 * Describes the message gateway.RelationshipToolStart.
 * Use `create(RelationshipToolStartSchema)` to create a new message.
 */
export const RelationshipToolStartSchema: GenMessage<RelationshipToolStart> = /*@__PURE__*/
  messageDesc(file_gateway, 15);

/**
 * @generated from message gateway.RelationshipToolFinish
 */
export type RelationshipToolFinish = Message<"gateway.RelationshipToolFinish"> & {
  /**
   * @generated from field: int32 numItems = 1;
   */
  numItems: number;
};

/**
 * Describes the message gateway.RelationshipToolFinish.
 * Use `create(RelationshipToolFinishSchema)` to create a new message.
 */
export const RelationshipToolFinishSchema: GenMessage<RelationshipToolFinish> = /*@__PURE__*/
  messageDesc(file_gateway, 16);

/**
 * @generated from message gateway.ChangesByReferenceToolStart
 */
export type ChangesByReferenceToolStart = Message<"gateway.ChangesByReferenceToolStart"> & {
  /**
   * @generated from field: string type = 1;
   */
  type: string;

  /**
   * @generated from field: string uniqueAttributeValue = 2;
   */
  uniqueAttributeValue: string;

  /**
   * @generated from field: string scope = 3;
   */
  scope: string;
};

/**
 * Describes the message gateway.ChangesByReferenceToolStart.
 * Use `create(ChangesByReferenceToolStartSchema)` to create a new message.
 */
export const ChangesByReferenceToolStartSchema: GenMessage<ChangesByReferenceToolStart> = /*@__PURE__*/
  messageDesc(file_gateway, 17);

/**
 * @generated from message gateway.ChangeByReferenceSummary
 */
export type ChangeByReferenceSummary = Message<"gateway.ChangeByReferenceSummary"> & {
  /**
   * from ChangeProperties
   *
   * @generated from field: string title = 1;
   */
  title: string;

  /**
   * from ChangeMetadata
   *
   * @generated from field: bytes UUID = 2;
   */
  UUID: Uint8Array;

  /**
   * From ChangeMetadata
   *
   * @generated from field: google.protobuf.Timestamp createdAt = 3;
   */
  createdAt?: Timestamp;

  /**
   * From ChangeProperties
   *
   * @generated from field: string owner = 4;
   */
  owner: string;

  /**
   * From ChangeMetadata
   *
   * @generated from field: int32 numAffectedItems = 5;
   */
  numAffectedItems: number;

  /**
   * From ChangeMetadata
   *
   * @generated from field: changes.ChangeStatus changeStatus = 6;
   */
  changeStatus: ChangeStatus;
};

/**
 * Describes the message gateway.ChangeByReferenceSummary.
 * Use `create(ChangeByReferenceSummarySchema)` to create a new message.
 */
export const ChangeByReferenceSummarySchema: GenMessage<ChangeByReferenceSummary> = /*@__PURE__*/
  messageDesc(file_gateway, 18);

/**
 * @generated from message gateway.ChangesByReferenceToolFinish
 */
export type ChangesByReferenceToolFinish = Message<"gateway.ChangesByReferenceToolFinish"> & {
  /**
   * @generated from field: repeated gateway.ChangeByReferenceSummary changeSummaries = 1;
   */
  changeSummaries: ChangeByReferenceSummary[];
};

/**
 * Describes the message gateway.ChangesByReferenceToolFinish.
 * Use `create(ChangesByReferenceToolFinishSchema)` to create a new message.
 */
export const ChangesByReferenceToolFinishSchema: GenMessage<ChangesByReferenceToolFinish> = /*@__PURE__*/
  messageDesc(file_gateway, 19);

/**
 * @generated from message gateway.ToolStart
 */
export type ToolStart = Message<"gateway.ToolStart"> & {
  /**
   * @generated from field: gateway.ToolMetadata metadata = 1;
   */
  metadata?: ToolMetadata;

  /**
   * @generated from oneof gateway.ToolStart.tool_type
   */
  toolType: {
    /**
     * @generated from field: gateway.QueryToolStart query = 2;
     */
    value: QueryToolStart;
    case: "query";
  } | {
    /**
     * @generated from field: gateway.RelationshipToolStart relationship = 3;
     */
    value: RelationshipToolStart;
    case: "relationship";
  } | {
    /**
     * @generated from field: gateway.ChangesByReferenceToolStart changesByReference = 4;
     */
    value: ChangesByReferenceToolStart;
    case: "changesByReference";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message gateway.ToolStart.
 * Use `create(ToolStartSchema)` to create a new message.
 */
export const ToolStartSchema: GenMessage<ToolStart> = /*@__PURE__*/
  messageDesc(file_gateway, 20);

/**
 * @generated from message gateway.ToolFinish
 */
export type ToolFinish = Message<"gateway.ToolFinish"> & {
  /**
   * @generated from field: gateway.ToolMetadata metadata = 1;
   */
  metadata?: ToolMetadata;

  /**
   * @generated from field: string error = 2;
   */
  error: string;

  /**
   * @generated from oneof gateway.ToolFinish.tool_type
   */
  toolType: {
    /**
     * @generated from field: gateway.QueryToolFinish query = 3;
     */
    value: QueryToolFinish;
    case: "query";
  } | {
    /**
     * @generated from field: gateway.RelationshipToolFinish relationship = 4;
     */
    value: RelationshipToolFinish;
    case: "relationship";
  } | {
    /**
     * @generated from field: gateway.ChangesByReferenceToolFinish changesByReference = 5;
     */
    value: ChangesByReferenceToolFinish;
    case: "changesByReference";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message gateway.ToolFinish.
 * Use `create(ToolFinishSchema)` to create a new message.
 */
export const ToolFinishSchema: GenMessage<ToolFinish> = /*@__PURE__*/
  messageDesc(file_gateway, 21);

/**
 * @generated from message gateway.ChatResponse
 */
export type ChatResponse = Message<"gateway.ChatResponse"> & {
  /**
   * @generated from field: string text = 1;
   */
  text: string;

  /**
   * @generated from field: string error = 2;
   */
  error: string;
};

/**
 * Describes the message gateway.ChatResponse.
 * Use `create(ChatResponseSchema)` to create a new message.
 */
export const ChatResponseSchema: GenMessage<ChatResponse> = /*@__PURE__*/
  messageDesc(file_gateway, 22);

