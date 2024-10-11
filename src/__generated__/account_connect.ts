// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts,import_extension=.ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AdminCreateSourceRequest, AdminCreateTokenRequest, AdminDeleteAccountRequest, AdminDeleteAccountResponse, AdminDeleteSourceRequest, AdminGetAccountRequest, AdminGetSourceRequest, AdminKeepaliveSourcesRequest, AdminListSourcesRequest, AdminUpdateAccountRequest, AdminUpdateSourceRequest, CreateAccountRequest, CreateAccountResponse, CreateSourceRequest, CreateSourceResponse, CreateTokenRequest, CreateTokenResponse, DeleteAccountRequest, DeleteAccountResponse, DeleteSourceRequest, DeleteSourceResponse, GetAccountRequest, GetAccountResponse, GetSourceRequest, GetSourceResponse, GetTrialEndRequest, GetTrialEndResponse, KeepaliveSourcesRequest, KeepaliveSourcesResponse, ListAccountsRequest, ListAccountsResponse, ListAllSourcesStatusRequest, ListAllSourcesStatusResponse, ListSourcesRequest, ListSourcesResponse, RevlinkWarmupRequest, RevlinkWarmupResponse, SubmitSourceHeartbeatRequest, SubmitSourceHeartbeatResponse, UpdateAccountResponse, UpdateSourceRequest, UpdateSourceResponse } from "./account_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * The admin service allows users with Admin privileges to any account. Many of
 * the RPCs in this service mirror RPCs in the ManagementService, but allow the
 * user to specify an account to operate on, rather than using the account that
 * the user belongs to.
 *
 * @generated from service account.AdminService
 */
export const AdminService = {
  typeName: "account.AdminService",
  methods: {
    /**
     * Lists the details of all NATS Accounts
     *
     * @generated from rpc account.AdminService.ListAccounts
     */
    listAccounts: {
      name: "ListAccounts",
      I: ListAccountsRequest,
      O: ListAccountsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Creates a new account, public_nkey will be autogenerated
     *
     * @generated from rpc account.AdminService.CreateAccount
     */
    createAccount: {
      name: "CreateAccount",
      I: CreateAccountRequest,
      O: CreateAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates account details, returns the account
     *
     * @generated from rpc account.AdminService.UpdateAccount
     */
    updateAccount: {
      name: "UpdateAccount",
      I: AdminUpdateAccountRequest,
      O: UpdateAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Get the details of a given account
     *
     * @generated from rpc account.AdminService.GetAccount
     */
    getAccount: {
      name: "GetAccount",
      I: AdminGetAccountRequest,
      O: GetAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Completely deletes an account. This includes all of the data in that
     * account, bookmarks, changes etc. It also deletes all users from Auth0
     * that are associated with this account
     *
     * @generated from rpc account.AdminService.DeleteAccount
     */
    deleteAccount: {
      name: "DeleteAccount",
      I: AdminDeleteAccountRequest,
      O: AdminDeleteAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all sources within the chosen account
     *
     * @generated from rpc account.AdminService.ListSources
     */
    listSources: {
      name: "ListSources",
      I: AdminListSourcesRequest,
      O: ListSourcesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Creates a new source within the chosen account
     *
     * @generated from rpc account.AdminService.CreateSource
     */
    createSource: {
      name: "CreateSource",
      I: AdminCreateSourceRequest,
      O: CreateSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Get the details of a source within the chosen account
     *
     * @generated from rpc account.AdminService.GetSource
     */
    getSource: {
      name: "GetSource",
      I: AdminGetSourceRequest,
      O: GetSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Update the details of a source within the chosen account
     *
     * @generated from rpc account.AdminService.UpdateSource
     */
    updateSource: {
      name: "UpdateSource",
      I: AdminUpdateSourceRequest,
      O: UpdateSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deletes a source from a chosen account
     *
     * @generated from rpc account.AdminService.DeleteSource
     */
    deleteSource: {
      name: "DeleteSource",
      I: AdminDeleteSourceRequest,
      O: DeleteSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates sources to keep them running in the background. This can be used
     * to add explicit action, when the built-in keepalives are not sufficient.
     *
     * @generated from rpc account.AdminService.KeepaliveSources
     */
    keepaliveSources: {
      name: "KeepaliveSources",
      I: AdminKeepaliveSourcesRequest,
      O: KeepaliveSourcesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Create a new NATS token for a given public NKey. The user requesting must
     * control the associated private key also in order to connect to NATS as
     * the token is not enough on its own
     *
     * @generated from rpc account.AdminService.CreateToken
     */
    createToken: {
      name: "CreateToken",
      I: AdminCreateTokenRequest,
      O: CreateTokenResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

/**
 * RPCs to manage the user's account, sources etc. All requests to this API are
 * scoped to that user's account via the
 * `https://api.overmind.tech/account-name` claim in the supplied token
 *
 * @generated from service account.ManagementService
 */
export const ManagementService = {
  typeName: "account.ManagementService",
  methods: {
    /**
     * Get the details of the account that this user belongs to
     *
     * @generated from rpc account.ManagementService.GetAccount
     */
    getAccount: {
      name: "GetAccount",
      I: GetAccountRequest,
      O: GetAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Completely deletes the user's account. This includes all of the data in
     * that account, bookmarks, changes etc. It also deletes the current user,
     * and all other users in that account from Auth0
     *
     * @generated from rpc account.ManagementService.DeleteAccount
     */
    deleteAccount: {
      name: "DeleteAccount",
      I: DeleteAccountRequest,
      O: DeleteAccountResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lists all sources within the user's account
     *
     * @generated from rpc account.ManagementService.ListSources
     */
    listSources: {
      name: "ListSources",
      I: ListSourcesRequest,
      O: ListSourcesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Creates a new source within the user's account
     *
     * @generated from rpc account.ManagementService.CreateSource
     */
    createSource: {
      name: "CreateSource",
      I: CreateSourceRequest,
      O: CreateSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Get the details of a source
     *
     * @generated from rpc account.ManagementService.GetSource
     */
    getSource: {
      name: "GetSource",
      I: GetSourceRequest,
      O: GetSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Update the details of a source
     *
     * @generated from rpc account.ManagementService.UpdateSource
     */
    updateSource: {
      name: "UpdateSource",
      I: UpdateSourceRequest,
      O: UpdateSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deletes a source from a user's account
     *
     * @generated from rpc account.ManagementService.DeleteSource
     */
    deleteSource: {
      name: "DeleteSource",
      I: DeleteSourceRequest,
      O: DeleteSourceResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Sources heartbeat and health
     * List of all recently active sources and their health, includes managed and local sources
     *
     * @generated from rpc account.ManagementService.ListAllSourcesStatus
     */
    listAllSourcesStatus: {
      name: "ListAllSourcesStatus",
      I: ListAllSourcesStatusRequest,
      O: ListAllSourcesStatusResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Heartbeat from a source to keep it registered and healthy
     *
     * @generated from rpc account.ManagementService.SubmitSourceHeartbeat
     */
    submitSourceHeartbeat: {
      name: "SubmitSourceHeartbeat",
      I: SubmitSourceHeartbeatRequest,
      O: SubmitSourceHeartbeatResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates sources to keep them running in the background. This can be used
     * to add explicit action, when the built-in keepalives are not sufficient.
     *
     * @generated from rpc account.ManagementService.KeepaliveSources
     */
    keepaliveSources: {
      name: "KeepaliveSources",
      I: KeepaliveSourcesRequest,
      O: KeepaliveSourcesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Create a new NATS token for a given public NKey. The user requesting must
     * control the associated private key also in order to connect to NATS as
     * the token is not enough on its own
     *
     * @generated from rpc account.ManagementService.CreateToken
     */
    createToken: {
      name: "CreateToken",
      I: CreateTokenRequest,
      O: CreateTokenResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Ensure that all reverse links are populated. This does internal debouncing
     * so the actual logic does only run when required.
     *
     * @generated from rpc account.ManagementService.RevlinkWarmup
     */
    revlinkWarmup: {
      name: "RevlinkWarmup",
      I: RevlinkWarmupRequest,
      O: RevlinkWarmupResponse,
      kind: MethodKind.ServerStreaming,
    },
    /**
     * @generated from rpc account.ManagementService.GetTrialEnd
     */
    getTrialEnd: {
      name: "GetTrialEnd",
      I: GetTrialEndRequest,
      O: GetTrialEndResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

