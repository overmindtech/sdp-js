// @generated by protoc-gen-connect-es v0.8.4 with parameter "target=ts,import_extension=.ts"
// @generated from file changes.proto (package changes, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateAppRequest, CreateAppResponse, CreateChangeRequest, CreateChangeResponse, DeleteAppRequest, DeleteAppResponse, DeleteChangeRequest, DeleteChangeResponse, GetAppRequest, GetAppResponse, GetChangeRequest, GetChangeResponse, GetChangesHomeRequest, GetChangesHomeResponse, GetOnboardingRequest, GetOnboardingResponse, ListAppRequest, ListAppResponse, ListChangeRequest, ListChangeResponse, UpdateAppRequest, UpdateAppResponse, UpdateChangeRequest, UpdateChangeResponse, UpdateOnboardingRequest, UpdateOnboardingResponse } from "./changes_pb.ts";
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
     * @generated from rpc changes.ChangesService.ListApp
     */
    listApp: {
      name: "ListApp",
      I: ListAppRequest,
      O: ListAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.CreateApp
     */
    createApp: {
      name: "CreateApp",
      I: CreateAppRequest,
      O: CreateAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.GetApp
     */
    getApp: {
      name: "GetApp",
      I: GetAppRequest,
      O: GetAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.UpdateApp
     */
    updateApp: {
      name: "UpdateApp",
      I: UpdateAppRequest,
      O: UpdateAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.DeleteApp
     */
    deleteApp: {
      name: "DeleteApp",
      I: DeleteAppRequest,
      O: DeleteAppResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.ListChange
     */
    listChange: {
      name: "ListChange",
      I: ListChangeRequest,
      O: ListChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.CreateChange
     */
    createChange: {
      name: "CreateChange",
      I: CreateChangeRequest,
      O: CreateChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.GetChange
     */
    getChange: {
      name: "GetChange",
      I: GetChangeRequest,
      O: GetChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.UpdateChange
     */
    updateChange: {
      name: "UpdateChange",
      I: UpdateChangeRequest,
      O: UpdateChangeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc changes.ChangesService.DeleteChange
     */
    deleteChange: {
      name: "DeleteChange",
      I: DeleteChangeRequest,
      O: DeleteChangeResponse,
      kind: MethodKind.Unary,
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
     * @generated from rpc changes.ChangesService.GetChangesHome
     */
    getChangesHome: {
      name: "GetChangesHome",
      I: GetChangesHomeRequest,
      O: GetChangesHomeResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

