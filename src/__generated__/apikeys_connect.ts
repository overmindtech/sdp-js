// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts,import_extension=.ts"
// @generated from file apikeys.proto (package apikeys, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateAPIKeyRequest, CreateAPIKeyResponse, DeleteAPIKeyRequest, DeleteAPIKeyResponse, ExchangeKeyForTokenRequest, ExchangeKeyForTokenResponse, GetAPIKeyRequest, GetAPIKeyResponse, ListAPIKeysRequest, ListAPIKeysResponse, RefreshAPIKeyRequest, RefreshAPIKeyResponse, UpdateAPIKeyRequest, UpdateAPIKeyResponse } from "./apikeys_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * The API Key Service is designed to give services like CI, webhooks etc. a
 * simple non-rotating secret that they can use when calling out to Overmind.
 * In order to keep the auth as simple as possible, these API keys don't
 * actually confer any access themselves, they need to be exchanged for an Oauth
 * access token using this API. The server will then return the client a valid
 * token that they can then use for subsequent requests
 *
 *
 * @generated from service apikeys.ApiKeyService
 */
export const ApiKeyService = {
  typeName: "apikeys.ApiKeyService",
  methods: {
    /**
     * Creates an API key, pending access token generation from Auth0. The key
     * cannot be used until the user has been redirected to the given URL which
     * allows Auth0 to actually generate an access token
     *
     * @generated from rpc apikeys.ApiKeyService.CreateAPIKey
     */
    createAPIKey: {
      name: "CreateAPIKey",
      I: CreateAPIKeyRequest,
      O: CreateAPIKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Refreshes an API key, returning a new one with the same metadata and
     * properties. The response will be the same as CreateAPIKey, and requires
     * the same redirect handling to authenticate the new key.
     *
     * @generated from rpc apikeys.ApiKeyService.RefreshAPIKey
     */
    refreshAPIKey: {
      name: "RefreshAPIKey",
      I: RefreshAPIKeyRequest,
      O: RefreshAPIKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc apikeys.ApiKeyService.GetAPIKey
     */
    getAPIKey: {
      name: "GetAPIKey",
      I: GetAPIKeyRequest,
      O: GetAPIKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc apikeys.ApiKeyService.UpdateAPIKey
     */
    updateAPIKey: {
      name: "UpdateAPIKey",
      I: UpdateAPIKeyRequest,
      O: UpdateAPIKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc apikeys.ApiKeyService.ListAPIKeys
     */
    listAPIKeys: {
      name: "ListAPIKeys",
      I: ListAPIKeysRequest,
      O: ListAPIKeysResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc apikeys.ApiKeyService.DeleteAPIKey
     */
    deleteAPIKey: {
      name: "DeleteAPIKey",
      I: DeleteAPIKeyRequest,
      O: DeleteAPIKeyResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Exchanges an Overmind API key for an Oauth access token. That token can
     * then be used to access all other Overmind APIs
     *
     * @generated from rpc apikeys.ApiKeyService.ExchangeKeyForToken
     */
    exchangeKeyForToken: {
      name: "ExchangeKeyForToken",
      I: ExchangeKeyForTokenRequest,
      O: ExchangeKeyForTokenResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

