// @generated by protoc-gen-connect-query v1.4.2 with parameter "target=ts,import_extension=.ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateSourceRequest, CreateSourceResponse, CreateTokenRequest, CreateTokenResponse, DeleteAccountRequest, DeleteAccountResponse, DeleteSourceRequest, DeleteSourceResponse, GetAccountRequest, GetAccountResponse, GetSourceRequest, GetSourceResponse, GetTrialEndRequest, GetTrialEndResponse, KeepaliveSourcesRequest, KeepaliveSourcesResponse, ListAllSourcesStatusRequest, ListAllSourcesStatusResponse, ListSourcesRequest, ListSourcesResponse, SubmitSourceHeartbeatRequest, SubmitSourceHeartbeatResponse, UpdateSourceRequest, UpdateSourceResponse } from "./account_pb.ts";

/**
 * Get the details of the account that this user belongs to
 *
 * @generated from rpc account.ManagementService.GetAccount
 */
export const getAccount = {
  localName: "getAccount",
  name: "GetAccount",
  kind: MethodKind.Unary,
  I: GetAccountRequest,
  O: GetAccountResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Completely deletes the user's account. This includes all of the data in
 * that account, bookmarks, changes etc. It also deletes the current user,
 * and all other users in that account from Auth0
 *
 * @generated from rpc account.ManagementService.DeleteAccount
 */
export const deleteAccount = {
  localName: "deleteAccount",
  name: "DeleteAccount",
  kind: MethodKind.Unary,
  I: DeleteAccountRequest,
  O: DeleteAccountResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Lists all sources within the user's account
 *
 * @generated from rpc account.ManagementService.ListSources
 */
export const listSources = {
  localName: "listSources",
  name: "ListSources",
  kind: MethodKind.Unary,
  I: ListSourcesRequest,
  O: ListSourcesResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Creates a new source within the user's account
 *
 * @generated from rpc account.ManagementService.CreateSource
 */
export const createSource = {
  localName: "createSource",
  name: "CreateSource",
  kind: MethodKind.Unary,
  I: CreateSourceRequest,
  O: CreateSourceResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Get the details of a source
 *
 * @generated from rpc account.ManagementService.GetSource
 */
export const getSource = {
  localName: "getSource",
  name: "GetSource",
  kind: MethodKind.Unary,
  I: GetSourceRequest,
  O: GetSourceResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Update the details of a source
 *
 * @generated from rpc account.ManagementService.UpdateSource
 */
export const updateSource = {
  localName: "updateSource",
  name: "UpdateSource",
  kind: MethodKind.Unary,
  I: UpdateSourceRequest,
  O: UpdateSourceResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Deletes a source from a user's account
 *
 * @generated from rpc account.ManagementService.DeleteSource
 */
export const deleteSource = {
  localName: "deleteSource",
  name: "DeleteSource",
  kind: MethodKind.Unary,
  I: DeleteSourceRequest,
  O: DeleteSourceResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Sources heartbeat and health
 * List of all recently active sources and their health, includes information from srcman
 * meaning that it can show the status of managed sources that have not started and
 * connected yet
 *
 * @generated from rpc account.ManagementService.ListAllSourcesStatus
 */
export const listAllSourcesStatus = {
  localName: "listAllSourcesStatus",
  name: "ListAllSourcesStatus",
  kind: MethodKind.Unary,
  I: ListAllSourcesStatusRequest,
  O: ListAllSourcesStatusResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Lists all active sources and their health. This should be used to determine
 * what types, scopes etc are available rather than `ListAllSourcesStatus` since
 * this endpoint only include running, available sources
 *
 * @generated from rpc account.ManagementService.ListActiveSourcesStatus
 */
export const listActiveSourcesStatus = {
  localName: "listActiveSourcesStatus",
  name: "ListActiveSourcesStatus",
  kind: MethodKind.Unary,
  I: ListAllSourcesStatusRequest,
  O: ListAllSourcesStatusResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Heartbeat from a source to keep it registered and healthy
 *
 * @generated from rpc account.ManagementService.SubmitSourceHeartbeat
 */
export const submitSourceHeartbeat = {
  localName: "submitSourceHeartbeat",
  name: "SubmitSourceHeartbeat",
  kind: MethodKind.Unary,
  I: SubmitSourceHeartbeatRequest,
  O: SubmitSourceHeartbeatResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Updates sources to keep them running in the background. This can be used
 * to add explicit action, when the built-in keepalives are not sufficient.
 *
 * @generated from rpc account.ManagementService.KeepaliveSources
 */
export const keepaliveSources = {
  localName: "keepaliveSources",
  name: "KeepaliveSources",
  kind: MethodKind.Unary,
  I: KeepaliveSourcesRequest,
  O: KeepaliveSourcesResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * Create a new NATS token for a given public NKey. The user requesting must
 * control the associated private key also in order to connect to NATS as
 * the token is not enough on its own
 *
 * @generated from rpc account.ManagementService.CreateToken
 */
export const createToken = {
  localName: "createToken",
  name: "CreateToken",
  kind: MethodKind.Unary,
  I: CreateTokenRequest,
  O: CreateTokenResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;

/**
 * @generated from rpc account.ManagementService.GetTrialEnd
 */
export const getTrialEnd = {
  localName: "getTrialEnd",
  name: "GetTrialEnd",
  kind: MethodKind.Unary,
  I: GetTrialEndRequest,
  O: GetTrialEndResponse,
  service: {
    typeName: "account.ManagementService"
  }
} as const;
