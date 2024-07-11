// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file snapshots.proto (package snapshots, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { Item, Query, Reference } from "./items_pb.ts";
import { Bookmark } from "./bookmarks_pb.ts";

/**
 * @generated from message snapshots.Snapshot
 */
export class Snapshot extends Message<Snapshot> {
  /**
   * @generated from field: snapshots.SnapshotMetadata metadata = 1;
   */
  metadata?: SnapshotMetadata;

  /**
   * @generated from field: snapshots.SnapshotProperties properties = 2;
   */
  properties?: SnapshotProperties;

  constructor(data?: PartialMessage<Snapshot>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.Snapshot";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: SnapshotMetadata },
    { no: 2, name: "properties", kind: "message", T: SnapshotProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Snapshot {
    return new Snapshot().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Snapshot {
    return new Snapshot().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Snapshot {
    return new Snapshot().fromJsonString(jsonString, options);
  }

  static equals(a: Snapshot | PlainMessage<Snapshot> | undefined, b: Snapshot | PlainMessage<Snapshot> | undefined): boolean {
    return proto3.util.equals(Snapshot, a, b);
  }
}

/**
 * @generated from message snapshots.SnapshotProperties
 */
export class SnapshotProperties extends Message<SnapshotProperties> {
  /**
   * name of this snapshot
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * description of this snapshot
   *
   * @generated from field: string description = 2;
   */
  description = "";

  /**
   * queries that make up the snapshot
   *
   * @generated from field: repeated Query queries = 3;
   */
  queries: Query[] = [];

  /**
   * items that should be excluded from the snapshot's results
   *
   * @generated from field: repeated Reference excludedItems = 4;
   */
  excludedItems: Reference[] = [];

  /**
   * items stored in the snapshot
   *
   * @generated from field: repeated Item items = 5;
   */
  items: Item[] = [];

  constructor(data?: PartialMessage<SnapshotProperties>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.SnapshotProperties";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "queries", kind: "message", T: Query, repeated: true },
    { no: 4, name: "excludedItems", kind: "message", T: Reference, repeated: true },
    { no: 5, name: "items", kind: "message", T: Item, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotProperties {
    return new SnapshotProperties().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotProperties {
    return new SnapshotProperties().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotProperties {
    return new SnapshotProperties().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotProperties | PlainMessage<SnapshotProperties> | undefined, b: SnapshotProperties | PlainMessage<SnapshotProperties> | undefined): boolean {
    return proto3.util.equals(SnapshotProperties, a, b);
  }
}

/**
 * @generated from message snapshots.SnapshotMetadata
 */
export class SnapshotMetadata extends Message<SnapshotMetadata> {
  /**
   * unique id to identify this snapshot
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * timestamp when this snapshot was created
   *
   * @generated from field: google.protobuf.Timestamp created = 2;
   */
  created?: Timestamp;

  constructor(data?: PartialMessage<SnapshotMetadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.SnapshotMetadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotMetadata {
    return new SnapshotMetadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotMetadata {
    return new SnapshotMetadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotMetadata {
    return new SnapshotMetadata().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotMetadata | PlainMessage<SnapshotMetadata> | undefined, b: SnapshotMetadata | PlainMessage<SnapshotMetadata> | undefined): boolean {
    return proto3.util.equals(SnapshotMetadata, a, b);
  }
}

/**
 * lists all snapshots
 *
 * @generated from message snapshots.ListSnapshotsRequest
 */
export class ListSnapshotsRequest extends Message<ListSnapshotsRequest> {
  constructor(data?: PartialMessage<ListSnapshotsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.ListSnapshotsRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSnapshotsRequest {
    return new ListSnapshotsRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSnapshotsRequest {
    return new ListSnapshotsRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSnapshotsRequest {
    return new ListSnapshotsRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListSnapshotsRequest | PlainMessage<ListSnapshotsRequest> | undefined, b: ListSnapshotsRequest | PlainMessage<ListSnapshotsRequest> | undefined): boolean {
    return proto3.util.equals(ListSnapshotsRequest, a, b);
  }
}

/**
 * @generated from message snapshots.ListSnapshotResponse
 */
export class ListSnapshotResponse extends Message<ListSnapshotResponse> {
  /**
   * the list of all snapshots
   *
   * @generated from field: repeated snapshots.Snapshot snapshots = 1;
   */
  snapshots: Snapshot[] = [];

  constructor(data?: PartialMessage<ListSnapshotResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.ListSnapshotResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "snapshots", kind: "message", T: Snapshot, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSnapshotResponse {
    return new ListSnapshotResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSnapshotResponse {
    return new ListSnapshotResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSnapshotResponse {
    return new ListSnapshotResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListSnapshotResponse | PlainMessage<ListSnapshotResponse> | undefined, b: ListSnapshotResponse | PlainMessage<ListSnapshotResponse> | undefined): boolean {
    return proto3.util.equals(ListSnapshotResponse, a, b);
  }
}

/**
 * creates a new snapshot
 *
 * @generated from message snapshots.CreateSnapshotRequest
 */
export class CreateSnapshotRequest extends Message<CreateSnapshotRequest> {
  /**
   * properties of the new snapshot
   *
   * @generated from field: snapshots.SnapshotProperties properties = 1;
   */
  properties?: SnapshotProperties;

  constructor(data?: PartialMessage<CreateSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.CreateSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "properties", kind: "message", T: SnapshotProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateSnapshotRequest {
    return new CreateSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateSnapshotRequest {
    return new CreateSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateSnapshotRequest {
    return new CreateSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateSnapshotRequest | PlainMessage<CreateSnapshotRequest> | undefined, b: CreateSnapshotRequest | PlainMessage<CreateSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(CreateSnapshotRequest, a, b);
  }
}

/**
 * @generated from message snapshots.CreateSnapshotResponse
 */
export class CreateSnapshotResponse extends Message<CreateSnapshotResponse> {
  /**
   * the newly created snapshot
   *
   * @generated from field: snapshots.Snapshot snapshot = 1;
   */
  snapshot?: Snapshot;

  constructor(data?: PartialMessage<CreateSnapshotResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.CreateSnapshotResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "snapshot", kind: "message", T: Snapshot },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateSnapshotResponse {
    return new CreateSnapshotResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateSnapshotResponse {
    return new CreateSnapshotResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateSnapshotResponse {
    return new CreateSnapshotResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateSnapshotResponse | PlainMessage<CreateSnapshotResponse> | undefined, b: CreateSnapshotResponse | PlainMessage<CreateSnapshotResponse> | undefined): boolean {
    return proto3.util.equals(CreateSnapshotResponse, a, b);
  }
}

/**
 * get the details of a specific snapshot
 *
 * @generated from message snapshots.GetSnapshotRequest
 */
export class GetSnapshotRequest extends Message<GetSnapshotRequest> {
  /**
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<GetSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.GetSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSnapshotRequest {
    return new GetSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSnapshotRequest {
    return new GetSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSnapshotRequest {
    return new GetSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetSnapshotRequest | PlainMessage<GetSnapshotRequest> | undefined, b: GetSnapshotRequest | PlainMessage<GetSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(GetSnapshotRequest, a, b);
  }
}

/**
 * @generated from message snapshots.GetSnapshotResponse
 */
export class GetSnapshotResponse extends Message<GetSnapshotResponse> {
  /**
   * @generated from field: snapshots.Snapshot snapshot = 1;
   */
  snapshot?: Snapshot;

  constructor(data?: PartialMessage<GetSnapshotResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.GetSnapshotResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "snapshot", kind: "message", T: Snapshot },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetSnapshotResponse {
    return new GetSnapshotResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetSnapshotResponse {
    return new GetSnapshotResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetSnapshotResponse {
    return new GetSnapshotResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetSnapshotResponse | PlainMessage<GetSnapshotResponse> | undefined, b: GetSnapshotResponse | PlainMessage<GetSnapshotResponse> | undefined): boolean {
    return proto3.util.equals(GetSnapshotResponse, a, b);
  }
}

/**
 * updates the properties of an existing snapshot
 *
 * @generated from message snapshots.UpdateSnapshotRequest
 */
export class UpdateSnapshotRequest extends Message<UpdateSnapshotRequest> {
  /**
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  /**
   * @generated from field: snapshots.SnapshotProperties properties = 2;
   */
  properties?: SnapshotProperties;

  constructor(data?: PartialMessage<UpdateSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.UpdateSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "properties", kind: "message", T: SnapshotProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateSnapshotRequest {
    return new UpdateSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateSnapshotRequest {
    return new UpdateSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateSnapshotRequest {
    return new UpdateSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateSnapshotRequest | PlainMessage<UpdateSnapshotRequest> | undefined, b: UpdateSnapshotRequest | PlainMessage<UpdateSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(UpdateSnapshotRequest, a, b);
  }
}

/**
 * @generated from message snapshots.UpdateSnapshotResponse
 */
export class UpdateSnapshotResponse extends Message<UpdateSnapshotResponse> {
  /**
   * the updated version of the snapshot
   *
   * @generated from field: snapshots.Snapshot snapshot = 1;
   */
  snapshot?: Snapshot;

  constructor(data?: PartialMessage<UpdateSnapshotResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.UpdateSnapshotResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "snapshot", kind: "message", T: Snapshot },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateSnapshotResponse {
    return new UpdateSnapshotResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateSnapshotResponse {
    return new UpdateSnapshotResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateSnapshotResponse {
    return new UpdateSnapshotResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateSnapshotResponse | PlainMessage<UpdateSnapshotResponse> | undefined, b: UpdateSnapshotResponse | PlainMessage<UpdateSnapshotResponse> | undefined): boolean {
    return proto3.util.equals(UpdateSnapshotResponse, a, b);
  }
}

/**
 * deletes a given snapshot
 *
 * @generated from message snapshots.DeleteSnapshotRequest
 */
export class DeleteSnapshotRequest extends Message<DeleteSnapshotRequest> {
  /**
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.DeleteSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteSnapshotRequest {
    return new DeleteSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteSnapshotRequest {
    return new DeleteSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteSnapshotRequest {
    return new DeleteSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteSnapshotRequest | PlainMessage<DeleteSnapshotRequest> | undefined, b: DeleteSnapshotRequest | PlainMessage<DeleteSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(DeleteSnapshotRequest, a, b);
  }
}

/**
 * @generated from message snapshots.DeleteSnapshotResponse
 */
export class DeleteSnapshotResponse extends Message<DeleteSnapshotResponse> {
  constructor(data?: PartialMessage<DeleteSnapshotResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.DeleteSnapshotResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteSnapshotResponse {
    return new DeleteSnapshotResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteSnapshotResponse {
    return new DeleteSnapshotResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteSnapshotResponse {
    return new DeleteSnapshotResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteSnapshotResponse | PlainMessage<DeleteSnapshotResponse> | undefined, b: DeleteSnapshotResponse | PlainMessage<DeleteSnapshotResponse> | undefined): boolean {
    return proto3.util.equals(DeleteSnapshotResponse, a, b);
  }
}

/**
 * get the initial data
 *
 * @generated from message snapshots.GetInitialDataRequest
 */
export class GetInitialDataRequest extends Message<GetInitialDataRequest> {
  constructor(data?: PartialMessage<GetInitialDataRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.GetInitialDataRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetInitialDataRequest {
    return new GetInitialDataRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetInitialDataRequest {
    return new GetInitialDataRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetInitialDataRequest {
    return new GetInitialDataRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetInitialDataRequest | PlainMessage<GetInitialDataRequest> | undefined, b: GetInitialDataRequest | PlainMessage<GetInitialDataRequest> | undefined): boolean {
    return proto3.util.equals(GetInitialDataRequest, a, b);
  }
}

/**
 * @generated from message snapshots.GetInitialDataResponse
 */
export class GetInitialDataResponse extends Message<GetInitialDataResponse> {
  /**
   * @generated from field: snapshots.Snapshot blastRadiusSnapshot = 1;
   */
  blastRadiusSnapshot?: Snapshot;

  /**
   * @generated from field: bookmarks.Bookmark changingItemsBookmark = 2;
   */
  changingItemsBookmark?: Bookmark;

  constructor(data?: PartialMessage<GetInitialDataResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.GetInitialDataResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "blastRadiusSnapshot", kind: "message", T: Snapshot },
    { no: 2, name: "changingItemsBookmark", kind: "message", T: Bookmark },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetInitialDataResponse {
    return new GetInitialDataResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetInitialDataResponse {
    return new GetInitialDataResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetInitialDataResponse {
    return new GetInitialDataResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetInitialDataResponse | PlainMessage<GetInitialDataResponse> | undefined, b: GetInitialDataResponse | PlainMessage<GetInitialDataResponse> | undefined): boolean {
    return proto3.util.equals(GetInitialDataResponse, a, b);
  }
}

/**
 * @generated from message snapshots.ListSnapshotsByGUNRequest
 */
export class ListSnapshotsByGUNRequest extends Message<ListSnapshotsByGUNRequest> {
  /**
   * @generated from field: string globallyUniqueName = 1;
   */
  globallyUniqueName = "";

  constructor(data?: PartialMessage<ListSnapshotsByGUNRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.ListSnapshotsByGUNRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "globallyUniqueName", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSnapshotsByGUNRequest {
    return new ListSnapshotsByGUNRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSnapshotsByGUNRequest {
    return new ListSnapshotsByGUNRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSnapshotsByGUNRequest {
    return new ListSnapshotsByGUNRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListSnapshotsByGUNRequest | PlainMessage<ListSnapshotsByGUNRequest> | undefined, b: ListSnapshotsByGUNRequest | PlainMessage<ListSnapshotsByGUNRequest> | undefined): boolean {
    return proto3.util.equals(ListSnapshotsByGUNRequest, a, b);
  }
}

/**
 * @generated from message snapshots.ListSnapshotsByGUNResponse
 */
export class ListSnapshotsByGUNResponse extends Message<ListSnapshotsByGUNResponse> {
  /**
   * @generated from field: repeated bytes UUIDs = 1;
   */
  UUIDs: Uint8Array[] = [];

  constructor(data?: PartialMessage<ListSnapshotsByGUNResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "snapshots.ListSnapshotsByGUNResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUIDs", kind: "scalar", T: 12 /* ScalarType.BYTES */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListSnapshotsByGUNResponse {
    return new ListSnapshotsByGUNResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListSnapshotsByGUNResponse {
    return new ListSnapshotsByGUNResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListSnapshotsByGUNResponse {
    return new ListSnapshotsByGUNResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListSnapshotsByGUNResponse | PlainMessage<ListSnapshotsByGUNResponse> | undefined, b: ListSnapshotsByGUNResponse | PlainMessage<ListSnapshotsByGUNResponse> | undefined): boolean {
    return proto3.util.equals(ListSnapshotsByGUNResponse, a, b);
  }
}

