// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts,import_extension=.ts"
// @generated from file snapshots.proto (package snapshots, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateSnapshotRequest, CreateSnapshotResponse, DeleteSnapshotRequest, DeleteSnapshotResponse, GetSnapshotRequest, GetSnapshotResponse, ListSnapshotResponse, ListSnapshotsByGUNRequest, ListSnapshotsByGUNResponse, ListSnapshotsRequest, UpdateSnapshotRequest, UpdateSnapshotResponse } from "./snapshots_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service snapshots.SnapshotsService
 */
export const SnapshotsService = {
  typeName: "snapshots.SnapshotsService",
  methods: {
    /**
     * @generated from rpc snapshots.SnapshotsService.ListSnapshots
     */
    listSnapshots: {
      name: "ListSnapshots",
      I: ListSnapshotsRequest,
      O: ListSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc snapshots.SnapshotsService.CreateSnapshot
     */
    createSnapshot: {
      name: "CreateSnapshot",
      I: CreateSnapshotRequest,
      O: CreateSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc snapshots.SnapshotsService.GetSnapshot
     */
    getSnapshot: {
      name: "GetSnapshot",
      I: GetSnapshotRequest,
      O: GetSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc snapshots.SnapshotsService.UpdateSnapshot
     */
    updateSnapshot: {
      name: "UpdateSnapshot",
      I: UpdateSnapshotRequest,
      O: UpdateSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc snapshots.SnapshotsService.DeleteSnapshot
     */
    deleteSnapshot: {
      name: "DeleteSnapshot",
      I: DeleteSnapshotRequest,
      O: DeleteSnapshotResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc snapshots.SnapshotsService.ListSnapshotByGUN
     */
    listSnapshotByGUN: {
      name: "ListSnapshotByGUN",
      I: ListSnapshotsByGUNRequest,
      O: ListSnapshotsByGUNResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

