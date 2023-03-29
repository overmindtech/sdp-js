// @generated by protoc-gen-es v1.2.0 with parameter "target=ts,import_extension=.ts"
// @generated from file snapshots.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * Descriptor for a snapshot
 *
 * @generated from message SnapshotDescriptor
 */
export class SnapshotDescriptor extends Message<SnapshotDescriptor> {
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

  /**
   * user supplied name of this snapshot
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * user supplied description of this snapshot
   *
   * @generated from field: string description = 4;
   */
  description = "";

  /**
   * number of items in this snapshot
   *
   * @generated from field: uint32 size = 5;
   */
  size = 0;

  constructor(data?: PartialMessage<SnapshotDescriptor>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SnapshotDescriptor";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "size", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotDescriptor {
    return new SnapshotDescriptor().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotDescriptor | PlainMessage<SnapshotDescriptor> | undefined, b: SnapshotDescriptor | PlainMessage<SnapshotDescriptor> | undefined): boolean {
    return proto3.util.equals(SnapshotDescriptor, a, b);
  }
}

/**
 * Retrieve the list of stored query snapshots for the currently active account.
 * Returns a SnapshotList
 *
 * TODO: pagination
 *
 * @generated from message ListSnapshotsRequest
 */
export class ListSnapshotsRequest extends Message<ListSnapshotsRequest> {
  constructor(data?: PartialMessage<ListSnapshotsRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "ListSnapshotsRequest";
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
 * response format for ListSnapshotsRequest
 *
 * @generated from message SnapshotListResult
 */
export class SnapshotListResult extends Message<SnapshotListResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * @generated from field: repeated SnapshotDescriptor snapshots = 3;
   */
  snapshots: SnapshotDescriptor[] = [];

  constructor(data?: PartialMessage<SnapshotListResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SnapshotListResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "snapshots", kind: "message", T: SnapshotDescriptor, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotListResult {
    return new SnapshotListResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotListResult {
    return new SnapshotListResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotListResult {
    return new SnapshotListResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotListResult | PlainMessage<SnapshotListResult> | undefined, b: SnapshotListResult | PlainMessage<SnapshotListResult> | undefined): boolean {
    return proto3.util.equals(SnapshotListResult, a, b);
  }
}

/**
 * Ask the gateway to store the current state as snapshot with the specified details.
 * Returns a SnapshotStored message when the snapshot is stored
 *
 * @generated from message StoreSnapshotRequest
 */
export class StoreSnapshotRequest extends Message<StoreSnapshotRequest> {
  /**
   * user supplied name of this snapshot
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * user supplied description of this snapshot
   *
   * @generated from field: string description = 2;
   */
  description = "";

  constructor(data?: PartialMessage<StoreSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "StoreSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "description", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): StoreSnapshotRequest {
    return new StoreSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): StoreSnapshotRequest {
    return new StoreSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): StoreSnapshotRequest {
    return new StoreSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: StoreSnapshotRequest | PlainMessage<StoreSnapshotRequest> | undefined, b: StoreSnapshotRequest | PlainMessage<StoreSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(StoreSnapshotRequest, a, b);
  }
}

/**
 * After a snapshot is successfully stored, this reply with the new snapshot's details is sent.
 *
 * @generated from message SnapshotStoreResult
 */
export class SnapshotStoreResult extends Message<SnapshotStoreResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  /**
   * @generated from field: SnapshotDescriptor snapshot = 3;
   */
  snapshot?: SnapshotDescriptor;

  constructor(data?: PartialMessage<SnapshotStoreResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SnapshotStoreResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "snapshot", kind: "message", T: SnapshotDescriptor },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotStoreResult {
    return new SnapshotStoreResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotStoreResult | PlainMessage<SnapshotStoreResult> | undefined, b: SnapshotStoreResult | PlainMessage<SnapshotStoreResult> | undefined): boolean {
    return proto3.util.equals(SnapshotStoreResult, a, b);
  }
}

/**
 * Ask the gateway to load the specified snapshot into the current state.
 * Results are streamed to the client in the same way query results are.
 *
 * @generated from message LoadSnapshotRequest
 */
export class LoadSnapshotRequest extends Message<LoadSnapshotRequest> {
  /**
   * unique id of the snapshot to load
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<LoadSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "LoadSnapshotRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "UUID", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LoadSnapshotRequest {
    return new LoadSnapshotRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LoadSnapshotRequest {
    return new LoadSnapshotRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LoadSnapshotRequest {
    return new LoadSnapshotRequest().fromJsonString(jsonString, options);
  }

  static equals(a: LoadSnapshotRequest | PlainMessage<LoadSnapshotRequest> | undefined, b: LoadSnapshotRequest | PlainMessage<LoadSnapshotRequest> | undefined): boolean {
    return proto3.util.equals(LoadSnapshotRequest, a, b);
  }
}

/**
 * @generated from message SnapshotLoadResult
 */
export class SnapshotLoadResult extends Message<SnapshotLoadResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<SnapshotLoadResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SnapshotLoadResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotLoadResult {
    return new SnapshotLoadResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotLoadResult | PlainMessage<SnapshotLoadResult> | undefined, b: SnapshotLoadResult | PlainMessage<SnapshotLoadResult> | undefined): boolean {
    return proto3.util.equals(SnapshotLoadResult, a, b);
  }
}

/**
 * Delete the snapshot with the specified ID.
 *
 * @generated from message DeleteSnapshotRequest
 */
export class DeleteSnapshotRequest extends Message<DeleteSnapshotRequest> {
  /**
   * unique id of the snapshot to delete
   *
   * @generated from field: bytes UUID = 1;
   */
  UUID = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteSnapshotRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "DeleteSnapshotRequest";
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
 * @generated from message SnapshotDeleteResult
 */
export class SnapshotDeleteResult extends Message<SnapshotDeleteResult> {
  /**
   * @generated from field: bool success = 1;
   */
  success = false;

  /**
   * @generated from field: string errorMessage = 2;
   */
  errorMessage = "";

  constructor(data?: PartialMessage<SnapshotDeleteResult>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "SnapshotDeleteResult";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "success", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "errorMessage", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SnapshotDeleteResult {
    return new SnapshotDeleteResult().fromJsonString(jsonString, options);
  }

  static equals(a: SnapshotDeleteResult | PlainMessage<SnapshotDeleteResult> | undefined, b: SnapshotDeleteResult | PlainMessage<SnapshotDeleteResult> | undefined): boolean {
    return proto3.util.equals(SnapshotDeleteResult, a, b);
  }
}

