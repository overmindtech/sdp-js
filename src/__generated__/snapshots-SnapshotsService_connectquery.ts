// @generated by protoc-gen-connect-query v2.0.1 with parameter "target=ts"
// @generated from file snapshots.proto (package snapshots, syntax proto3)
/* eslint-disable */

import { SnapshotsService } from "./snapshots_pb";

/**
 * @generated from rpc snapshots.SnapshotsService.ListSnapshots
 */
export const listSnapshots = SnapshotsService.method.listSnapshots;

/**
 * @generated from rpc snapshots.SnapshotsService.CreateSnapshot
 */
export const createSnapshot = SnapshotsService.method.createSnapshot;

/**
 * @generated from rpc snapshots.SnapshotsService.GetSnapshot
 */
export const getSnapshot = SnapshotsService.method.getSnapshot;

/**
 * @generated from rpc snapshots.SnapshotsService.UpdateSnapshot
 */
export const updateSnapshot = SnapshotsService.method.updateSnapshot;

/**
 * @generated from rpc snapshots.SnapshotsService.DeleteSnapshot
 */
export const deleteSnapshot = SnapshotsService.method.deleteSnapshot;

/**
 * @generated from rpc snapshots.SnapshotsService.ListSnapshotByGUN
 */
export const listSnapshotByGUN = SnapshotsService.method.listSnapshotByGUN;
