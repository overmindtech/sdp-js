// @generated by protoc-gen-connect-query v1.4.0 with parameter "target=ts,import_extension=.ts"
// @generated from file snapshots.proto (package snapshots, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateSnapshotRequest, CreateSnapshotResponse, DeleteSnapshotRequest, DeleteSnapshotResponse, GetInitialDataRequest, GetInitialDataResponse, GetSnapshotRequest, GetSnapshotResponse, ListSnapshotResponse, ListSnapshotsRequest, UpdateSnapshotRequest, UpdateSnapshotResponse } from "./snapshots_pb.ts";

/**
 * @generated from rpc snapshots.SnapshotsService.ListSnapshots
 */
export const listSnapshots = {
  localName: "listSnapshots",
  name: "ListSnapshots",
  kind: MethodKind.Unary,
  I: ListSnapshotsRequest,
  O: ListSnapshotResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;

/**
 * @generated from rpc snapshots.SnapshotsService.CreateSnapshot
 */
export const createSnapshot = {
  localName: "createSnapshot",
  name: "CreateSnapshot",
  kind: MethodKind.Unary,
  I: CreateSnapshotRequest,
  O: CreateSnapshotResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;

/**
 * @generated from rpc snapshots.SnapshotsService.GetSnapshot
 */
export const getSnapshot = {
  localName: "getSnapshot",
  name: "GetSnapshot",
  kind: MethodKind.Unary,
  I: GetSnapshotRequest,
  O: GetSnapshotResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;

/**
 * @generated from rpc snapshots.SnapshotsService.UpdateSnapshot
 */
export const updateSnapshot = {
  localName: "updateSnapshot",
  name: "UpdateSnapshot",
  kind: MethodKind.Unary,
  I: UpdateSnapshotRequest,
  O: UpdateSnapshotResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;

/**
 * @generated from rpc snapshots.SnapshotsService.DeleteSnapshot
 */
export const deleteSnapshot = {
  localName: "deleteSnapshot",
  name: "DeleteSnapshot",
  kind: MethodKind.Unary,
  I: DeleteSnapshotRequest,
  O: DeleteSnapshotResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;

/**
 * retrieve the initial data for the example change
 *
 * @generated from rpc snapshots.SnapshotsService.GetInitialData
 */
export const getInitialData = {
  localName: "getInitialData",
  name: "GetInitialData",
  kind: MethodKind.Unary,
  I: GetInitialDataRequest,
  O: GetInitialDataResponse,
  service: {
    typeName: "snapshots.SnapshotsService"
  }
} as const;
