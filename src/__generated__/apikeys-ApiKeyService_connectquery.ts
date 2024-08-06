// @generated by protoc-gen-connect-query v1.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file apikeys.proto (package apikeys, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateAPIKeyRequest, CreateAPIKeyResponse, DeleteAPIKeyRequest, DeleteAPIKeyResponse, ExchangeKeyForTokenRequest, ExchangeKeyForTokenResponse, GetAPIKeyRequest, GetAPIKeyResponse, ListAPIKeysRequest, ListAPIKeysResponse, RefreshAPIKeyRequest, RefreshAPIKeyResponse, UpdateAPIKeyRequest, UpdateAPIKeyResponse } from "./apikeys_pb.ts";

/**
 * Creates an API key, pending access token generation from Auth0. The key
 * cannot be used until the user has been redirected to the given URL which
 * allows Auth0 to actually generate an access token
 *
 * @generated from rpc apikeys.ApiKeyService.CreateAPIKey
 */
export const createAPIKey = {
  localName: "createAPIKey",
  name: "CreateAPIKey",
  kind: MethodKind.Unary,
  I: CreateAPIKeyRequest,
  O: CreateAPIKeyResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * Refreshes an API key, returning a new one with the same metadata and
 * properties. The response will be the same as CreateAPIKey, and requires
 * the same redirect handling to authenticate the new key.
 *
 * @generated from rpc apikeys.ApiKeyService.RefreshAPIKey
 */
export const refreshAPIKey = {
  localName: "refreshAPIKey",
  name: "RefreshAPIKey",
  kind: MethodKind.Unary,
  I: RefreshAPIKeyRequest,
  O: RefreshAPIKeyResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * @generated from rpc apikeys.ApiKeyService.GetAPIKey
 */
export const getAPIKey = {
  localName: "getAPIKey",
  name: "GetAPIKey",
  kind: MethodKind.Unary,
  I: GetAPIKeyRequest,
  O: GetAPIKeyResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * @generated from rpc apikeys.ApiKeyService.UpdateAPIKey
 */
export const updateAPIKey = {
  localName: "updateAPIKey",
  name: "UpdateAPIKey",
  kind: MethodKind.Unary,
  I: UpdateAPIKeyRequest,
  O: UpdateAPIKeyResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * @generated from rpc apikeys.ApiKeyService.ListAPIKeys
 */
export const listAPIKeys = {
  localName: "listAPIKeys",
  name: "ListAPIKeys",
  kind: MethodKind.Unary,
  I: ListAPIKeysRequest,
  O: ListAPIKeysResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * @generated from rpc apikeys.ApiKeyService.DeleteAPIKey
 */
export const deleteAPIKey = {
  localName: "deleteAPIKey",
  name: "DeleteAPIKey",
  kind: MethodKind.Unary,
  I: DeleteAPIKeyRequest,
  O: DeleteAPIKeyResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;

/**
 * Exchanges an Overmind API key for an Oauth access token. That token can
 * then be used to access all other Overmind APIs
 *
 * @generated from rpc apikeys.ApiKeyService.ExchangeKeyForToken
 */
export const exchangeKeyForToken = {
  localName: "exchangeKeyForToken",
  name: "ExchangeKeyForToken",
  kind: MethodKind.Unary,
  I: ExchangeKeyForTokenRequest,
  O: ExchangeKeyForTokenResponse,
  service: {
    typeName: "apikeys.ApiKeyService"
  }
} as const;
