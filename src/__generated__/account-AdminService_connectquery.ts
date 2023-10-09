// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@connectrpc/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { AdminCreateSourceRequest, AdminCreateTokenRequest, AdminDeleteSourceRequest, AdminGetAccountRequest, AdminGetSourceRequest, AdminKeepaliveSourcesRequest, AdminListSourcesRequest, AdminUpdateSourceRequest, CreateAccountRequest, CreateAccountResponse, CreateSourceResponse, CreateTokenResponse, DeleteAccountRequest, DeleteAccountResponse, DeleteSourceResponse, GetAccountResponse, GetSourceResponse, KeepaliveSourcesResponse, ListAccountsRequest, ListAccountsResponse, ListSourcesResponse, UpdateSourceResponse } from "./account_pb.ts";

export const typeName = "account.AdminService";

/**
 * Lists the details of all NATS Accounts
 *
 * @generated from rpc account.AdminService.ListAccounts
 */
export const listAccounts = createQueryService({
  service: {
    methods: {
      listAccounts: {
        name: "ListAccounts",
        kind: MethodKind.Unary,
        I: ListAccountsRequest,
        O: ListAccountsResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).listAccounts;

/**
 * Creates a new account, public_nkey will be autogenerated
 *
 * @generated from rpc account.AdminService.CreateAccount
 */
export const createAccount = createQueryService({
  service: {
    methods: {
      createAccount: {
        name: "CreateAccount",
        kind: MethodKind.Unary,
        I: CreateAccountRequest,
        O: CreateAccountResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).createAccount;

/**
 * Get the details of a given account
 *
 * @generated from rpc account.AdminService.GetAccount
 */
export const getAccount = createQueryService({
  service: {
    methods: {
      getAccount: {
        name: "GetAccount",
        kind: MethodKind.Unary,
        I: AdminGetAccountRequest,
        O: GetAccountResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).getAccount;

/**
 * Deletes an account
 *
 * @generated from rpc account.AdminService.DeleteAccount
 */
export const deleteAccount = createQueryService({
  service: {
    methods: {
      deleteAccount: {
        name: "DeleteAccount",
        kind: MethodKind.Unary,
        I: DeleteAccountRequest,
        O: DeleteAccountResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).deleteAccount;

/**
 * Lists all sources within the closen account
 *
 * @generated from rpc account.AdminService.ListSources
 */
export const listSources = createQueryService({
  service: {
    methods: {
      listSources: {
        name: "ListSources",
        kind: MethodKind.Unary,
        I: AdminListSourcesRequest,
        O: ListSourcesResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).listSources;

/**
 * Creates a new source within the closen account
 *
 * @generated from rpc account.AdminService.CreateSource
 */
export const createSource = createQueryService({
  service: {
    methods: {
      createSource: {
        name: "CreateSource",
        kind: MethodKind.Unary,
        I: AdminCreateSourceRequest,
        O: CreateSourceResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).createSource;

/**
 * Get the details of a source within the closen account
 *
 * @generated from rpc account.AdminService.GetSource
 */
export const getSource = createQueryService({
  service: {
    methods: {
      getSource: {
        name: "GetSource",
        kind: MethodKind.Unary,
        I: AdminGetSourceRequest,
        O: GetSourceResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).getSource;

/**
 * Update the details of a source within the closen account
 *
 * @generated from rpc account.AdminService.UpdateSource
 */
export const updateSource = createQueryService({
  service: {
    methods: {
      updateSource: {
        name: "UpdateSource",
        kind: MethodKind.Unary,
        I: AdminUpdateSourceRequest,
        O: UpdateSourceResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).updateSource;

/**
 * Deletes a source from a closen account
 *
 * @generated from rpc account.AdminService.DeleteSource
 */
export const deleteSource = createQueryService({
  service: {
    methods: {
      deleteSource: {
        name: "DeleteSource",
        kind: MethodKind.Unary,
        I: AdminDeleteSourceRequest,
        O: DeleteSourceResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).deleteSource;

/**
 * Updates sources to keep them running in the background. This can be used
 * to add explicit action, when the built-in keepalives are not sufficient.
 *
 * @generated from rpc account.AdminService.KeepaliveSources
 */
export const keepaliveSources = createQueryService({
  service: {
    methods: {
      keepaliveSources: {
        name: "KeepaliveSources",
        kind: MethodKind.Unary,
        I: AdminKeepaliveSourcesRequest,
        O: KeepaliveSourcesResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).keepaliveSources;

/**
 * Create a new NATS token for a given public NKey. The user requesting must
 * control the associated private key also in order to connect to NATS as
 * the token is not enough on its own
 *
 * @generated from rpc account.AdminService.CreateToken
 */
export const createToken = createQueryService({
  service: {
    methods: {
      createToken: {
        name: "CreateToken",
        kind: MethodKind.Unary,
        I: AdminCreateTokenRequest,
        O: CreateTokenResponse,
      },
    },
    typeName: "account.AdminService",
  },
}).createToken;
