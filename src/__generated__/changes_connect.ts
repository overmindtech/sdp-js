// @generated by protoc-gen-connect-es v0.12.0 with parameter "target=ts,import_extension=.ts"
// @generated from file changes.proto (package changes, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CalculateBlastRadiusRequest, CalculateBlastRadiusResponse, CreateAppRequest, CreateAppResponse, CreateChangeRequest, CreateChangeResponse, CreateSimpleAppRequest, CreateSimpleAppResponse, DeleteAppRequest, DeleteAppResponse, DeleteChangeRequest, DeleteChangeResponse, EndChangeRequest, EndChangeResponse, GetAffectedAppsRequest, GetAffectedAppsResponse, GetAppRequest, GetAppResponse, GetAppSummariesRequest, GetAppSummariesResponse, GetAppSummaryRequest, GetAppSummaryResponse, GetChangeAuditLogRequest, GetChangeAuditLogResponse, GetChangeRequest, GetChangeResponse, GetChangeTimelineRequest, GetChangeTimelineResponse, GetDiffRequest, GetDiffResponse, GetOnboardingRequest, GetOnboardingResponse, ListAppChangesRequest, ListAppChangesResponse, ListAppChangesSummaryRequest, ListAppChangesSummaryResponse, ListAppsRequest, ListAppsResponse, ListChangesRequest, ListChangesResponse, ListChangingItemsSummaryRequest, ListChangingItemsSummaryResponse, ListHomeAppsRequest, ListHomeAppsResponse, ListHomeChangesRequest, ListHomeChangesResponse, RefreshStateRequest, RefreshStateResponse, SimulateChangeRequest, SimulateChangeResponse, StartChangeRequest, StartChangeResponse, UpdateAppRequest, UpdateAppResponse, UpdateChangeRequest, UpdateChangeResponse, UpdateChangingItemsRequest, UpdateOnboardingRequest, UpdateOnboardingResponse } from "./changes_pb.ts";
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
     * Creates an app using just a URL as input. This automatically creates and
     * sets the bookmark UUID, along with the url for display in the GUI
     *
     * @generated from rpc changes.ChangesService.CreateSimpleApp
     */
    createSimpleApp: {
      name: "CreateSimpleApp",
      I: CreateSimpleAppRequest,
      O: CreateSimpleAppResponse,
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
     * Get the timeline of changes for a given change
     *
     * @generated from rpc changes.ChangesService.GetChangeTimeline
     */
    getChangeTimeline: {
      name: "GetChangeTimeline",
      I: GetChangeTimelineRequest,
      O: GetChangeTimelineResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Ask the gateway to refresh all internal caches and status slots
     * The RPC will return immediately doing all processing in the background
     *
     * @generated from rpc changes.ChangesService.RefreshState
     */
    refreshState: {
      name: "RefreshState",
      I: RefreshStateRequest,
      O: RefreshStateResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Calculates the blast radius of a change using the
     * `changingItemsBookmarkUUID` as the starting point. If the
     * `changingItemsBookmarkUUID` is blank, this will return an error.
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
     * Takes the "after" snapshot, stores it in `systemAfterSnapshotUUID`, calculates
     * the change diff and stores it as a list of DiffedItems and
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
     * Lists all apps, designed for use in the apps home page
     *
     * @generated from rpc changes.ChangesService.ListHomeApps
     */
    listHomeApps: {
      name: "ListHomeApps",
      I: ListHomeAppsRequest,
      O: ListHomeAppsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all changes, designed for use in the changes home page
     *
     * @generated from rpc changes.ChangesService.ListHomeChanges
     */
    listHomeChanges: {
      name: "ListHomeChanges",
      I: ListHomeChangesRequest,
      O: ListHomeChangesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets a summary of an app, used when a user clicks on a given app
     *
     * @generated from rpc changes.ChangesService.GetAppSummary
     */
    getAppSummary: {
      name: "GetAppSummary",
      I: GetAppSummaryRequest,
      O: GetAppSummaryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets a summaries of a list of apps
     *
     * @generated from rpc changes.ChangesService.GetAppSummaries
     */
    getAppSummaries: {
      name: "GetAppSummaries",
      I: GetAppSummariesRequest,
      O: GetAppSummariesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all changes affecting an app
     *
     * @generated from rpc changes.ChangesService.ListAppChanges
     */
    listAppChanges: {
      name: "ListAppChanges",
      I: ListAppChangesRequest,
      O: ListAppChangesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all changes affecting an app, returning only a summary of each change
     * rather than the full details
     *
     * @generated from rpc changes.ChangesService.ListAppChangesSummary
     */
    listAppChangesSummary: {
      name: "ListAppChangesSummary",
      I: ListAppChangesSummaryRequest,
      O: ListAppChangesSummaryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * This sets the items that are changing in a given change, and updates the
     * blast radius. In the backend this will convert the references to GET
     * requests, save them to a bookmark, and set this as the
     * changingItemsBookmarkUUID in the change itself before triggering a blast
     * radius calculation
     *
     * @generated from rpc changes.ChangesService.UpdateChangingItems
     */
    updateChangingItems: {
      name: "UpdateChangingItems",
      I: UpdateChangingItemsRequest,
      O: CalculateBlastRadiusResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * Returns a list of apps that are affected by this change. This is calculated
     * by looking at the blast radius snapshot and finding all apps that have
     * items in the snapshot.
     *
     * @generated from rpc changes.ChangesService.GetAffectedApps
     */
    getAffectedApps: {
      name: "GetAffectedApps",
      I: GetAffectedAppsRequest,
      O: GetAffectedAppsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the diff summary for all items that were planned to change as part of
     * this change. This includes the high level details of the item, and the
     * status (e.g. changed, deleted) but not the diff itself
     *
     * @generated from rpc changes.ChangesService.ListChangingItemsSummary
     */
    listChangingItemsSummary: {
      name: "ListChangingItemsSummary",
      I: ListChangingItemsSummaryRequest,
      O: ListChangingItemsSummaryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the audit log for a given change
     *
     * @generated from rpc changes.ChangesService.GetChangeAuditLog
     */
    getChangeAuditLog: {
      name: "GetChangeAuditLog",
      I: GetChangeAuditLogRequest,
      O: GetChangeAuditLogResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Gets the full diff of everything that changed as part of this "change".
     * This includes all items and also edges between them
     *
     * @generated from rpc changes.ChangesService.GetDiff
     */
    getDiff: {
      name: "GetDiff",
      I: GetDiffRequest,
      O: GetDiffResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

