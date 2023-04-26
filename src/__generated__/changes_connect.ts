// @generated by protoc-gen-connect-es v0.8.4 with parameter "target=ts,import_extension=.ts"
// @generated from file changes.proto (package changes, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CalculateBlastRadiusRequest, CalculateBlastRadiusResponse, CreateAppRequest, CreateAppResponse, CreateChangeRequest, CreateChangeResponse, DeleteAppRequest, DeleteAppResponse, DeleteChangeRequest, DeleteChangeResponse, EndChangeRequest, EndChangeResponse, GetAppRequest, GetAppResponse, GetChangeRequest, GetChangeResponse, GetChangesHomeRequest, GetChangesHomeResponse, GetOnboardingRequest, GetOnboardingResponse, ListAppChangesRequest, ListAppChangesResponse, ListAppsRequest, ListAppsResponse, ListChangesRequest, ListChangesResponse, SimulateChangeRequest, SimulateChangeResponse, StartChangeRequest, StartChangeResponse, UpdateAppRequest, UpdateAppResponse, UpdateChangeRequest, UpdateChangeResponse, UpdateOnboardingRequest, UpdateOnboardingResponse } from "./changes_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * All the request/reply APIs for the Change/App iteration
 *
 * @generated from service changes.ChangesService
 */
export const ChangesService = {
  typeName: "changes.ChangesService",
  methods: {
    /**
     * Lists all apps
     *
     * @generated from rpc changes.ChangesService.ListApps
     */
    listApps: {
      name: "ListApps",
      I: ListAppsRequest,
      O: ListAppsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Creates a new app
     *
     * @generated from rpc changes.ChangesService.CreateApp
     */
    createApp: {
      name: "CreateApp",
      I: CreateAppRequest,
      O: CreateAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the details of an existing app
     *
     * @generated from rpc changes.ChangesService.GetApp
     */
    getApp: {
      name: "GetApp",
      I: GetAppRequest,
      O: GetAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates an existing app
     *
     * @generated from rpc changes.ChangesService.UpdateApp
     */
    updateApp: {
      name: "UpdateApp",
      I: UpdateAppRequest,
      O: UpdateAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deletes an app
     *
     * @generated from rpc changes.ChangesService.DeleteApp
     */
    deleteApp: {
      name: "DeleteApp",
      I: DeleteAppRequest,
      O: DeleteAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all changes
     *
     * @generated from rpc changes.ChangesService.ListChanges
     */
    listChanges: {
      name: "ListChanges",
      I: ListChangesRequest,
      O: ListChangesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Creates a new change
     *
     * @generated from rpc changes.ChangesService.CreateChange
     */
    createChange: {
      name: "CreateChange",
      I: CreateChangeRequest,
      O: CreateChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the details of an existing change
     *
     * @generated from rpc changes.ChangesService.GetChange
     */
    getChange: {
      name: "GetChange",
      I: GetChangeRequest,
      O: GetChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates an existing change
     *
     * @generated from rpc changes.ChangesService.UpdateChange
     */
    updateChange: {
      name: "UpdateChange",
      I: UpdateChangeRequest,
      O: UpdateChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deletes a change
     *
     * @generated from rpc changes.ChangesService.DeleteChange
     */
    deleteChange: {
      name: "DeleteChange",
      I: DeleteChangeRequest,
      O: DeleteChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Calculates the blast radius of a change using the
     * `affectedItemsBookmarkUUID` as the starting point. If the
     * `affectedItemsBookmarkUUID` is blank, this will return an error.
     * Returns a stream of status updates. The response stream closes when all calculating has been done.
     * Executing this RPC will move the Change to the `STATUS_DEFINING` state or return an error.
     *
     * @generated from rpc changes.ChangesService.CalculateBlastRadius
     */
    calculateBlastRadius: {
      name: "CalculateBlastRadius",
      I: CalculateBlastRadiusRequest,
      O: CalculateBlastRadiusResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * Executing this RPC take a snapshot of the current blast radius and store it
     * in `systemBeforeSnapshotUUID` and then advance the status to
     * `STATUS_HAPPENING`. It can only be called once per change.
     *
     * @generated from rpc changes.ChangesService.StartChange
     */
    startChange: {
      name: "StartChange",
      I: StartChangeRequest,
      O: StartChangeResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * Takes the "after" snapshot, stores it in `systemAfterSnapshotUUID` and
     * advances the change status to `STATUS_DONE`
     *
     * @generated from rpc changes.ChangesService.EndChange
     */
    endChange: {
      name: "EndChange",
      I: EndChangeRequest,
      O: EndChangeResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc changes.ChangesService.GetOnboarding
     */
    getOnboarding: {
      name: "GetOnboarding",
      I: GetOnboardingRequest,
      O: GetOnboardingResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.UpdateOnboarding
     */
    updateOnboarding: {
      name: "UpdateOnboarding",
      I: UpdateOnboardingRequest,
      O: UpdateOnboardingResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Simulates a change without the user actually having to do anything. The
     * change specified in the request should be in the `STATUS_DEFINING` state.
     * It will be moved to the `STATUS_DONE` state after the simulation is
     * complete.
     *
     * @generated from rpc changes.ChangesService.SimulateChange
     */
    simulateChange: {
      name: "SimulateChange",
      I: SimulateChangeRequest,
      O: SimulateChangeResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc changes.ChangesService.GetChangesHome
     */
    getChangesHome: {
      name: "GetChangesHome",
      I: GetChangesHomeRequest,
      O: GetChangesHomeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.ListAppChanges
     */
    listAppChanges: {
      name: "ListAppChanges",
      I: ListAppChangesRequest,
      O: ListAppChangesResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

