// @generated by protoc-gen-connect-query v0.4.0 with parameter "target=ts,import_extension=.ts"
// @generated from file changes.proto (package changes, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { CreateAppRequest, CreateAppResponse, CreateChangeRequest, CreateChangeResponse, CreateSimpleAppRequest, CreateSimpleAppResponse, DeleteAppRequest, DeleteAppResponse, DeleteChangeRequest, DeleteChangeResponse, GetAffectedAppsRequest, GetAffectedAppsResponse, GetAppRequest, GetAppResponse, GetAppSummariesRequest, GetAppSummariesResponse, GetAppSummaryRequest, GetAppSummaryResponse, GetChangeAuditLogRequest, GetChangeAuditLogResponse, GetChangeRequest, GetChangeResponse, GetDiffRequest, GetDiffResponse, GetOnboardingRequest, GetOnboardingResponse, ListAppChangesRequest, ListAppChangesResponse, ListAppChangesSummaryRequest, ListAppChangesSummaryResponse, ListAppsRequest, ListAppsResponse, ListChangesRequest, ListChangesResponse, ListChangingItemsSummaryRequest, ListChangingItemsSummaryResponse, ListHomeAppsRequest, ListHomeAppsResponse, ListHomeChangesRequest, ListHomeChangesResponse, RefreshStateRequest, RefreshStateResponse, UpdateAppRequest, UpdateAppResponse, UpdateChangeRequest, UpdateChangeResponse, UpdateOnboardingRequest, UpdateOnboardingResponse } from "./changes_pb.ts";

export const typeName = "changes.ChangesService";

/**
 * Lists all apps
 *
 * @generated from rpc changes.ChangesService.ListApps
 */
export const listApps = createQueryService({
  service: {
    methods: {
      listApps: {
        name: "ListApps",
        kind: MethodKind.Unary,
        I: ListAppsRequest,
        O: ListAppsResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listApps;

/**
 * Creates a new app
 *
 * @generated from rpc changes.ChangesService.CreateApp
 */
export const createApp = createQueryService({
  service: {
    methods: {
      createApp: {
        name: "CreateApp",
        kind: MethodKind.Unary,
        I: CreateAppRequest,
        O: CreateAppResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).createApp;

/**
 * Creates an app using just a URL as input. This automatically creates and
 * sets the bookmark UUID, along with the url for display in the GUI
 *
 * @generated from rpc changes.ChangesService.CreateSimpleApp
 */
export const createSimpleApp = createQueryService({
  service: {
    methods: {
      createSimpleApp: {
        name: "CreateSimpleApp",
        kind: MethodKind.Unary,
        I: CreateSimpleAppRequest,
        O: CreateSimpleAppResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).createSimpleApp;

/**
 * Gets the details of an existing app
 *
 * @generated from rpc changes.ChangesService.GetApp
 */
export const getApp = createQueryService({
  service: {
    methods: {
      getApp: {
        name: "GetApp",
        kind: MethodKind.Unary,
        I: GetAppRequest,
        O: GetAppResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getApp;

/**
 * Updates an existing app
 *
 * @generated from rpc changes.ChangesService.UpdateApp
 */
export const updateApp = createQueryService({
  service: {
    methods: {
      updateApp: {
        name: "UpdateApp",
        kind: MethodKind.Unary,
        I: UpdateAppRequest,
        O: UpdateAppResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).updateApp;

/**
 * Deletes an app
 *
 * @generated from rpc changes.ChangesService.DeleteApp
 */
export const deleteApp = createQueryService({
  service: {
    methods: {
      deleteApp: {
        name: "DeleteApp",
        kind: MethodKind.Unary,
        I: DeleteAppRequest,
        O: DeleteAppResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).deleteApp;

/**
 * Lists all changes
 *
 * @generated from rpc changes.ChangesService.ListChanges
 */
export const listChanges = createQueryService({
  service: {
    methods: {
      listChanges: {
        name: "ListChanges",
        kind: MethodKind.Unary,
        I: ListChangesRequest,
        O: ListChangesResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listChanges;

/**
 * Creates a new change
 *
 * @generated from rpc changes.ChangesService.CreateChange
 */
export const createChange = createQueryService({
  service: {
    methods: {
      createChange: {
        name: "CreateChange",
        kind: MethodKind.Unary,
        I: CreateChangeRequest,
        O: CreateChangeResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).createChange;

/**
 * Gets the details of an existing change
 *
 * @generated from rpc changes.ChangesService.GetChange
 */
export const getChange = createQueryService({
  service: {
    methods: {
      getChange: {
        name: "GetChange",
        kind: MethodKind.Unary,
        I: GetChangeRequest,
        O: GetChangeResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getChange;

/**
 * Updates an existing change
 *
 * @generated from rpc changes.ChangesService.UpdateChange
 */
export const updateChange = createQueryService({
  service: {
    methods: {
      updateChange: {
        name: "UpdateChange",
        kind: MethodKind.Unary,
        I: UpdateChangeRequest,
        O: UpdateChangeResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).updateChange;

/**
 * Deletes a change
 *
 * @generated from rpc changes.ChangesService.DeleteChange
 */
export const deleteChange = createQueryService({
  service: {
    methods: {
      deleteChange: {
        name: "DeleteChange",
        kind: MethodKind.Unary,
        I: DeleteChangeRequest,
        O: DeleteChangeResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).deleteChange;

/**
 * Ask the gateway to refresh all internal caches and status slots
 * The RPC will return immediately doing all processing in the background
 *
 * @generated from rpc changes.ChangesService.RefreshState
 */
export const refreshState = createQueryService({
  service: {
    methods: {
      refreshState: {
        name: "RefreshState",
        kind: MethodKind.Unary,
        I: RefreshStateRequest,
        O: RefreshStateResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).refreshState;

/**
 * @generated from rpc changes.ChangesService.GetOnboarding
 */
export const getOnboarding = createQueryService({
  service: {
    methods: {
      getOnboarding: {
        name: "GetOnboarding",
        kind: MethodKind.Unary,
        I: GetOnboardingRequest,
        O: GetOnboardingResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getOnboarding;

/**
 * @generated from rpc changes.ChangesService.UpdateOnboarding
 */
export const updateOnboarding = createQueryService({
  service: {
    methods: {
      updateOnboarding: {
        name: "UpdateOnboarding",
        kind: MethodKind.Unary,
        I: UpdateOnboardingRequest,
        O: UpdateOnboardingResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).updateOnboarding;

/**
 * Lists all apps, designed for use in the apps home page
 *
 * @generated from rpc changes.ChangesService.ListHomeApps
 */
export const listHomeApps = createQueryService({
  service: {
    methods: {
      listHomeApps: {
        name: "ListHomeApps",
        kind: MethodKind.Unary,
        I: ListHomeAppsRequest,
        O: ListHomeAppsResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listHomeApps;

/**
 * Lists all changes, designed for use in the changes home page
 *
 * @generated from rpc changes.ChangesService.ListHomeChanges
 */
export const listHomeChanges = createQueryService({
  service: {
    methods: {
      listHomeChanges: {
        name: "ListHomeChanges",
        kind: MethodKind.Unary,
        I: ListHomeChangesRequest,
        O: ListHomeChangesResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listHomeChanges;

/**
 * Gets a summary of an app, used when a user clicks on a given app
 *
 * @generated from rpc changes.ChangesService.GetAppSummary
 */
export const getAppSummary = createQueryService({
  service: {
    methods: {
      getAppSummary: {
        name: "GetAppSummary",
        kind: MethodKind.Unary,
        I: GetAppSummaryRequest,
        O: GetAppSummaryResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getAppSummary;

/**
 * Gets a summaries of a list of apps
 *
 * @generated from rpc changes.ChangesService.GetAppSummaries
 */
export const getAppSummaries = createQueryService({
  service: {
    methods: {
      getAppSummaries: {
        name: "GetAppSummaries",
        kind: MethodKind.Unary,
        I: GetAppSummariesRequest,
        O: GetAppSummariesResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getAppSummaries;

/**
 * Lists all changes affecting an app
 *
 * @generated from rpc changes.ChangesService.ListAppChanges
 */
export const listAppChanges = createQueryService({
  service: {
    methods: {
      listAppChanges: {
        name: "ListAppChanges",
        kind: MethodKind.Unary,
        I: ListAppChangesRequest,
        O: ListAppChangesResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listAppChanges;

/**
 * Lists all changes affecting an app, returning only a summary of each change
 * rather than the full details
 *
 * @generated from rpc changes.ChangesService.ListAppChangesSummary
 */
export const listAppChangesSummary = createQueryService({
  service: {
    methods: {
      listAppChangesSummary: {
        name: "ListAppChangesSummary",
        kind: MethodKind.Unary,
        I: ListAppChangesSummaryRequest,
        O: ListAppChangesSummaryResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listAppChangesSummary;

/**
 * Returns a list of apps that are affected by this change. This is calculated
 * by looking at the blast radius snapshot and finding all apps that have
 * items in the snapshot.
 *
 * @generated from rpc changes.ChangesService.GetAffectedApps
 */
export const getAffectedApps = createQueryService({
  service: {
    methods: {
      getAffectedApps: {
        name: "GetAffectedApps",
        kind: MethodKind.Unary,
        I: GetAffectedAppsRequest,
        O: GetAffectedAppsResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getAffectedApps;

/**
 * Gets the diff summary for all items that were planned to change as part of
 * this change. This includes the high level details of the item, and the
 * status (e.g. changed, deleted) but not the diff itself
 *
 * @generated from rpc changes.ChangesService.ListChangingItemsSummary
 */
export const listChangingItemsSummary = createQueryService({
  service: {
    methods: {
      listChangingItemsSummary: {
        name: "ListChangingItemsSummary",
        kind: MethodKind.Unary,
        I: ListChangingItemsSummaryRequest,
        O: ListChangingItemsSummaryResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).listChangingItemsSummary;

/**
 * Gets the audit log for a given change
 *
 * @generated from rpc changes.ChangesService.GetChangeAuditLog
 */
export const getChangeAuditLog = createQueryService({
  service: {
    methods: {
      getChangeAuditLog: {
        name: "GetChangeAuditLog",
        kind: MethodKind.Unary,
        I: GetChangeAuditLogRequest,
        O: GetChangeAuditLogResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getChangeAuditLog;

/**
 * Gets the full diff of everything that changed as part of this "change".
 * This includes all items and also edges between them
 *
 * @generated from rpc changes.ChangesService.GetDiff
 */
export const getDiff = createQueryService({
  service: {
    methods: {
      getDiff: {
        name: "GetDiff",
        kind: MethodKind.Unary,
        I: GetDiffRequest,
        O: GetDiffResponse,
      },
    },
    typeName: "changes.ChangesService",
  },
}).getDiff;
