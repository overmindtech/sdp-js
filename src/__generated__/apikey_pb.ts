// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file apikey.proto (package apikeys, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";

/**
 * @generated from enum apikeys.KeyStatus
 */
export enum KeyStatus {
  /**
   * @generated from enum value: KEY_STATUS_UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * This means the key has been created but we have not yet received the
   * callback from Auth0 which allows us to fetch the access token
   *
   * @generated from enum value: KEY_STATUS_UNAUTHORIZED = 1;
   */
  UNAUTHORIZED = 1,

  /**
   * Key is ready for use
   *
   * @generated from enum value: KEY_STATUS_READY = 2;
   */
  READY = 2,

  /**
   * There was an error getting the access token from Auth0
   *
   * @generated from enum value: KEY_STATUS_ERROR = 3;
   */
  ERROR = 3,

  /**
   * The API key has been revoked
   *
   * @generated from enum value: KEY_STATUS_REVOKED = 4;
   */
  REVOKED = 4,
}
// Retrieve enum metadata with: proto3.getEnumType(KeyStatus)
proto3.util.setEnumType(KeyStatus, "apikeys.KeyStatus", [
  { no: 0, name: "KEY_STATUS_UNKNOWN" },
  { no: 1, name: "KEY_STATUS_UNAUTHORIZED" },
  { no: 2, name: "KEY_STATUS_READY" },
  { no: 3, name: "KEY_STATUS_ERROR" },
  { no: 4, name: "KEY_STATUS_REVOKED" },
]);

/**
 * @generated from message apikeys.APIKey
 */
export class APIKey extends Message<APIKey> {
  /**
   * @generated from field: apikeys.APIKeyMetadata metadata = 1;
   */
  metadata?: APIKeyMetadata;

  /**
   * @generated from field: apikeys.APIKeyProperties properties = 2;
   */
  properties?: APIKeyProperties;

  constructor(data?: PartialMessage<APIKey>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.APIKey";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "metadata", kind: "message", T: APIKeyMetadata },
    { no: 2, name: "properties", kind: "message", T: APIKeyProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): APIKey {
    return new APIKey().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): APIKey {
    return new APIKey().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): APIKey {
    return new APIKey().fromJsonString(jsonString, options);
  }

  static equals(a: APIKey | PlainMessage<APIKey> | undefined, b: APIKey | PlainMessage<APIKey> | undefined): boolean {
    return proto3.util.equals(APIKey, a, b);
  }
}

/**
 * @generated from message apikeys.APIKeyMetadata
 */
export class APIKeyMetadata extends Message<APIKeyMetadata> {
  /**
   * The ID of this API key
   *
   * @generated from field: bytes uuid = 1;
   */
  uuid = new Uint8Array(0);

  /**
   * When the API Key was created
   *
   * @generated from field: google.protobuf.Timestamp created = 2;
   */
  created?: Timestamp;

  /**
   * The last time the API key was exchanged for an access token
   *
   * @generated from field: google.protobuf.Timestamp lastUsed = 3;
   */
  lastUsed?: Timestamp;

  /**
   * The actual API key
   *
   * @generated from field: string key = 4;
   */
  key = "";

  /**
   * The list of scopes that this token has access to
   *
   * @generated from field: repeated string scopes = 5;
   */
  scopes: string[] = [];

  /**
   * The status of the key
   *
   * @generated from field: apikeys.KeyStatus status = 6;
   */
  status = KeyStatus.UNKNOWN;

  /**
   * The error encountered when authorizing the key. This will only be set if
   * the status is ERROR
   *
   * @generated from field: string error = 7;
   */
  error = "";

  constructor(data?: PartialMessage<APIKeyMetadata>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.APIKeyMetadata";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "created", kind: "message", T: Timestamp },
    { no: 3, name: "lastUsed", kind: "message", T: Timestamp },
    { no: 4, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "status", kind: "enum", T: proto3.getEnumType(KeyStatus) },
    { no: 7, name: "error", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): APIKeyMetadata {
    return new APIKeyMetadata().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): APIKeyMetadata {
    return new APIKeyMetadata().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): APIKeyMetadata {
    return new APIKeyMetadata().fromJsonString(jsonString, options);
  }

  static equals(a: APIKeyMetadata | PlainMessage<APIKeyMetadata> | undefined, b: APIKeyMetadata | PlainMessage<APIKeyMetadata> | undefined): boolean {
    return proto3.util.equals(APIKeyMetadata, a, b);
  }
}

/**
 * @generated from message apikeys.APIKeyProperties
 */
export class APIKeyProperties extends Message<APIKeyProperties> {
  /**
   * The name of the API key
   *
   * @generated from field: string name = 1;
   */
  name = "";

  constructor(data?: PartialMessage<APIKeyProperties>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.APIKeyProperties";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): APIKeyProperties {
    return new APIKeyProperties().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): APIKeyProperties {
    return new APIKeyProperties().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): APIKeyProperties {
    return new APIKeyProperties().fromJsonString(jsonString, options);
  }

  static equals(a: APIKeyProperties | PlainMessage<APIKeyProperties> | undefined, b: APIKeyProperties | PlainMessage<APIKeyProperties> | undefined): boolean {
    return proto3.util.equals(APIKeyProperties, a, b);
  }
}

/**
 * @generated from message apikeys.CreateAPIKeyRequest
 */
export class CreateAPIKeyRequest extends Message<CreateAPIKeyRequest> {
  /**
   * The name of the key to create
   *
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * The scopes that the key should have
   *
   * @generated from field: repeated string scopes = 2;
   */
  scopes: string[] = [];

  /**
   * The URL that the user should be redirected to after the whole process is
   * over. This should be a page in the frontend, probably the one they
   * started from, but could also be a detail page for this particular API key
   *
   * @generated from field: string finalFrontendRedirect = 3;
   */
  finalFrontendRedirect = "";

  constructor(data?: PartialMessage<CreateAPIKeyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.CreateAPIKeyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "scopes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 3, name: "finalFrontendRedirect", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateAPIKeyRequest {
    return new CreateAPIKeyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateAPIKeyRequest {
    return new CreateAPIKeyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateAPIKeyRequest {
    return new CreateAPIKeyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateAPIKeyRequest | PlainMessage<CreateAPIKeyRequest> | undefined, b: CreateAPIKeyRequest | PlainMessage<CreateAPIKeyRequest> | undefined): boolean {
    return proto3.util.equals(CreateAPIKeyRequest, a, b);
  }
}

/**
 * @generated from message apikeys.CreateAPIKeyResponse
 */
export class CreateAPIKeyResponse extends Message<CreateAPIKeyResponse> {
  /**
   * Details of the newly created API Key
   *
   * @generated from field: apikeys.APIKey key = 1;
   */
  key?: APIKey;

  /**
   * The URL that the user should visit in order to authorize the newly
   * created key. This will allow Auth0 to generate a code that will be passed
   * to the API server via a callback. This code is then exchanged by the API
   * server for an access token and refresh token. The user will be redirected
   * back to the frontend once this process is complete.
   *
   * The authorizeURL will contain a `state` paremeter which is a UUID that
   * can be used to look up the API key in the database once the callback is
   * received
   *
   * @generated from field: string authorizeURL = 2;
   */
  authorizeURL = "";

  constructor(data?: PartialMessage<CreateAPIKeyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.CreateAPIKeyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "message", T: APIKey },
    { no: 2, name: "authorizeURL", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateAPIKeyResponse {
    return new CreateAPIKeyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateAPIKeyResponse {
    return new CreateAPIKeyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateAPIKeyResponse {
    return new CreateAPIKeyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateAPIKeyResponse | PlainMessage<CreateAPIKeyResponse> | undefined, b: CreateAPIKeyResponse | PlainMessage<CreateAPIKeyResponse> | undefined): boolean {
    return proto3.util.equals(CreateAPIKeyResponse, a, b);
  }
}

/**
 * @generated from message apikeys.GetAPIKeyRequest
 */
export class GetAPIKeyRequest extends Message<GetAPIKeyRequest> {
  /**
   * The UUID of the API Key to get
   *
   * @generated from field: bytes uuid = 1;
   */
  uuid = new Uint8Array(0);

  constructor(data?: PartialMessage<GetAPIKeyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.GetAPIKeyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAPIKeyRequest {
    return new GetAPIKeyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAPIKeyRequest {
    return new GetAPIKeyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAPIKeyRequest {
    return new GetAPIKeyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetAPIKeyRequest | PlainMessage<GetAPIKeyRequest> | undefined, b: GetAPIKeyRequest | PlainMessage<GetAPIKeyRequest> | undefined): boolean {
    return proto3.util.equals(GetAPIKeyRequest, a, b);
  }
}

/**
 * @generated from message apikeys.GetAPIKeyResponse
 */
export class GetAPIKeyResponse extends Message<GetAPIKeyResponse> {
  /**
   * @generated from field: apikeys.APIKey key = 1;
   */
  key?: APIKey;

  constructor(data?: PartialMessage<GetAPIKeyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.GetAPIKeyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "message", T: APIKey },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAPIKeyResponse {
    return new GetAPIKeyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAPIKeyResponse {
    return new GetAPIKeyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAPIKeyResponse {
    return new GetAPIKeyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetAPIKeyResponse | PlainMessage<GetAPIKeyResponse> | undefined, b: GetAPIKeyResponse | PlainMessage<GetAPIKeyResponse> | undefined): boolean {
    return proto3.util.equals(GetAPIKeyResponse, a, b);
  }
}

/**
 * @generated from message apikeys.UpdateAPIKeyRequest
 */
export class UpdateAPIKeyRequest extends Message<UpdateAPIKeyRequest> {
  /**
   * The UUID of the API key to update
   *
   * @generated from field: bytes uuid = 1;
   */
  uuid = new Uint8Array(0);

  /**
   * New properties to update
   *
   * @generated from field: apikeys.APIKeyProperties properties = 2;
   */
  properties?: APIKeyProperties;

  constructor(data?: PartialMessage<UpdateAPIKeyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.UpdateAPIKeyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
    { no: 2, name: "properties", kind: "message", T: APIKeyProperties },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateAPIKeyRequest {
    return new UpdateAPIKeyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateAPIKeyRequest {
    return new UpdateAPIKeyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateAPIKeyRequest {
    return new UpdateAPIKeyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateAPIKeyRequest | PlainMessage<UpdateAPIKeyRequest> | undefined, b: UpdateAPIKeyRequest | PlainMessage<UpdateAPIKeyRequest> | undefined): boolean {
    return proto3.util.equals(UpdateAPIKeyRequest, a, b);
  }
}

/**
 * @generated from message apikeys.UpdateAPIKeyResponse
 */
export class UpdateAPIKeyResponse extends Message<UpdateAPIKeyResponse> {
  /**
   * The updated API key
   *
   * @generated from field: apikeys.APIKey key = 1;
   */
  key?: APIKey;

  constructor(data?: PartialMessage<UpdateAPIKeyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.UpdateAPIKeyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "message", T: APIKey },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateAPIKeyResponse {
    return new UpdateAPIKeyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateAPIKeyResponse {
    return new UpdateAPIKeyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateAPIKeyResponse {
    return new UpdateAPIKeyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateAPIKeyResponse | PlainMessage<UpdateAPIKeyResponse> | undefined, b: UpdateAPIKeyResponse | PlainMessage<UpdateAPIKeyResponse> | undefined): boolean {
    return proto3.util.equals(UpdateAPIKeyResponse, a, b);
  }
}

/**
 * @generated from message apikeys.ListAPIKeysRequest
 */
export class ListAPIKeysRequest extends Message<ListAPIKeysRequest> {
  constructor(data?: PartialMessage<ListAPIKeysRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.ListAPIKeysRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAPIKeysRequest {
    return new ListAPIKeysRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAPIKeysRequest {
    return new ListAPIKeysRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAPIKeysRequest {
    return new ListAPIKeysRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListAPIKeysRequest | PlainMessage<ListAPIKeysRequest> | undefined, b: ListAPIKeysRequest | PlainMessage<ListAPIKeysRequest> | undefined): boolean {
    return proto3.util.equals(ListAPIKeysRequest, a, b);
  }
}

/**
 * @generated from message apikeys.ListAPIKeysResponse
 */
export class ListAPIKeysResponse extends Message<ListAPIKeysResponse> {
  /**
   * @generated from field: repeated apikeys.APIKey keys = 1;
   */
  keys: APIKey[] = [];

  constructor(data?: PartialMessage<ListAPIKeysResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.ListAPIKeysResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "keys", kind: "message", T: APIKey, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListAPIKeysResponse {
    return new ListAPIKeysResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListAPIKeysResponse {
    return new ListAPIKeysResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListAPIKeysResponse {
    return new ListAPIKeysResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListAPIKeysResponse | PlainMessage<ListAPIKeysResponse> | undefined, b: ListAPIKeysResponse | PlainMessage<ListAPIKeysResponse> | undefined): boolean {
    return proto3.util.equals(ListAPIKeysResponse, a, b);
  }
}

/**
 * @generated from message apikeys.DeleteAPIKeyRequest
 */
export class DeleteAPIKeyRequest extends Message<DeleteAPIKeyRequest> {
  /**
   * The UUID of the API key to delete
   *
   * @generated from field: bytes uuid = 1;
   */
  uuid = new Uint8Array(0);

  constructor(data?: PartialMessage<DeleteAPIKeyRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.DeleteAPIKeyRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "uuid", kind: "scalar", T: 12 /* ScalarType.BYTES */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteAPIKeyRequest {
    return new DeleteAPIKeyRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteAPIKeyRequest {
    return new DeleteAPIKeyRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteAPIKeyRequest {
    return new DeleteAPIKeyRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteAPIKeyRequest | PlainMessage<DeleteAPIKeyRequest> | undefined, b: DeleteAPIKeyRequest | PlainMessage<DeleteAPIKeyRequest> | undefined): boolean {
    return proto3.util.equals(DeleteAPIKeyRequest, a, b);
  }
}

/**
 * @generated from message apikeys.DeleteAPIKeyResponse
 */
export class DeleteAPIKeyResponse extends Message<DeleteAPIKeyResponse> {
  constructor(data?: PartialMessage<DeleteAPIKeyResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.DeleteAPIKeyResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteAPIKeyResponse {
    return new DeleteAPIKeyResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteAPIKeyResponse {
    return new DeleteAPIKeyResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteAPIKeyResponse {
    return new DeleteAPIKeyResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeleteAPIKeyResponse | PlainMessage<DeleteAPIKeyResponse> | undefined, b: DeleteAPIKeyResponse | PlainMessage<DeleteAPIKeyResponse> | undefined): boolean {
    return proto3.util.equals(DeleteAPIKeyResponse, a, b);
  }
}

/**
 * @generated from message apikeys.ExchangeKeyForTokenRequest
 */
export class ExchangeKeyForTokenRequest extends Message<ExchangeKeyForTokenRequest> {
  /**
   * The API Key that you want to exchange for an Oauth access token
   *
   * @generated from field: string apiKey = 1;
   */
  apiKey = "";

  constructor(data?: PartialMessage<ExchangeKeyForTokenRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.ExchangeKeyForTokenRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "apiKey", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExchangeKeyForTokenRequest {
    return new ExchangeKeyForTokenRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExchangeKeyForTokenRequest {
    return new ExchangeKeyForTokenRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExchangeKeyForTokenRequest {
    return new ExchangeKeyForTokenRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ExchangeKeyForTokenRequest | PlainMessage<ExchangeKeyForTokenRequest> | undefined, b: ExchangeKeyForTokenRequest | PlainMessage<ExchangeKeyForTokenRequest> | undefined): boolean {
    return proto3.util.equals(ExchangeKeyForTokenRequest, a, b);
  }
}

/**
 * @generated from message apikeys.ExchangeKeyForTokenResponse
 */
export class ExchangeKeyForTokenResponse extends Message<ExchangeKeyForTokenResponse> {
  /**
   * The access token that can now be use to authenticate to Overmind and its
   * APIs
   *
   * @generated from field: string accessToken = 1;
   */
  accessToken = "";

  constructor(data?: PartialMessage<ExchangeKeyForTokenResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "apikeys.ExchangeKeyForTokenResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "accessToken", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ExchangeKeyForTokenResponse {
    return new ExchangeKeyForTokenResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ExchangeKeyForTokenResponse {
    return new ExchangeKeyForTokenResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ExchangeKeyForTokenResponse {
    return new ExchangeKeyForTokenResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ExchangeKeyForTokenResponse | PlainMessage<ExchangeKeyForTokenResponse> | undefined, b: ExchangeKeyForTokenResponse | PlainMessage<ExchangeKeyForTokenResponse> | undefined): boolean {
    return proto3.util.equals(ExchangeKeyForTokenResponse, a, b);
  }
}

