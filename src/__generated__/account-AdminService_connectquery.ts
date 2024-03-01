// @generated by protoc-gen-connect-query v1.3.0 with parameter "target=ts,import_extension=.ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { AdminCreateSourceRequest, AdminCreateTokenRequest, AdminDeleteSourceRequest, AdminGetAccountRequest, AdminGetSourceRequest, AdminKeepaliveSourcesRequest, AdminListSourcesRequest, AdminUpdateSourceRequest, CreateAccountRequest, CreateAccountResponse, CreateSourceResponse, CreateTokenResponse, DeleteAccountRequest, DeleteAccountResponse, DeleteSourceResponse, GetAccountResponse, GetSourceResponse, KeepaliveSourcesResponse, ListAccountsRequest, ListAccountsResponse, ListSourcesResponse, UpdateSourceResponse } from "./account_pb.ts";

/**
 * Lists the details of all NATS Accounts
 *
 * @generated from rpc account.AdminService.ListAccounts
 */
export const listAccounts = {
  localName: "listAccounts",
  name: "ListAccounts",
  kind: MethodKind.Unary,
  I: ListAccountsRequest,
  O: ListAccountsResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Creates a new account, public_nkey will be autogenerated
 *
 * @generated from rpc account.AdminService.CreateAccount
 */
export const createAccount = {
  localName: "createAccount",
  name: "CreateAccount",
  kind: MethodKind.Unary,
  I: CreateAccountRequest,
  O: CreateAccountResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Get the details of a given account
 *
 * @generated from rpc account.AdminService.GetAccount
 */
export const getAccount = {
  localName: "getAccount",
  name: "GetAccount",
  kind: MethodKind.Unary,
  I: AdminGetAccountRequest,
  O: GetAccountResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Deletes an account
 *
 * @generated from rpc account.AdminService.DeleteAccount
 */
export const deleteAccount = {
  localName: "deleteAccount",
  name: "DeleteAccount",
  kind: MethodKind.Unary,
  I: DeleteAccountRequest,
  O: DeleteAccountResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Lists all sources within the closen account
 *
 * @generated from rpc account.AdminService.ListSources
 */
export const listSources = {
  localName: "listSources",
  name: "ListSources",
  kind: MethodKind.Unary,
  I: AdminListSourcesRequest,
  O: ListSourcesResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Creates a new source within the closen account
 *
 * @generated from rpc account.AdminService.CreateSource
 */
export const createSource = {
  localName: "createSource",
  name: "CreateSource",
  kind: MethodKind.Unary,
  I: AdminCreateSourceRequest,
  O: CreateSourceResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Get the details of a source within the closen account
 *
 * @generated from rpc account.AdminService.GetSource
 */
export const getSource = {
  localName: "getSource",
  name: "GetSource",
  kind: MethodKind.Unary,
  I: AdminGetSourceRequest,
  O: GetSourceResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Update the details of a source within the closen account
 *
 * @generated from rpc account.AdminService.UpdateSource
 */
export const updateSource = {
  localName: "updateSource",
  name: "UpdateSource",
  kind: MethodKind.Unary,
  I: AdminUpdateSourceRequest,
  O: UpdateSourceResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Deletes a source from a closen account
 *
 * @generated from rpc account.AdminService.DeleteSource
 */
export const deleteSource = {
  localName: "deleteSource",
  name: "DeleteSource",
  kind: MethodKind.Unary,
  I: AdminDeleteSourceRequest,
  O: DeleteSourceResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Updates sources to keep them running in the background. This can be used
 * to add explicit action, when the built-in keepalives are not sufficient.
 *
 * @generated from rpc account.AdminService.KeepaliveSources
 */
export const keepaliveSources = {
  localName: "keepaliveSources",
  name: "KeepaliveSources",
  kind: MethodKind.Unary,
  I: AdminKeepaliveSourcesRequest,
  O: KeepaliveSourcesResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;

/**
 * Create a new NATS token for a given public NKey. The user requesting must
 * control the associated private key also in order to connect to NATS as
 * the token is not enough on its own
 *
 * @generated from rpc account.AdminService.CreateToken
 */
export const createToken = {
  localName: "createToken",
  name: "CreateToken",
  kind: MethodKind.Unary,
  I: AdminCreateTokenRequest,
  O: CreateTokenResponse,
  service: {
    typeName: "account.AdminService"
  }
} as const;
