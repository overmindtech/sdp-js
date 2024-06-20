// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file config.proto (package config, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * The config that is used when calculating the blast radius for a change, this
 * does not affect manually requested blast radii vie the "Explore" view or the
 * API
 *
 * @generated from message config.BlastRadiusConfig
 */
export class BlastRadiusConfig extends Message<BlastRadiusConfig> {
  /**
   * The maximum number of items that can be returned in a single blast radius
   * request. Once a request has hit this limit, all currently running
   * requests will be cancelled and the blast radius returned as-is
   *
   * @generated from field: int32 maxItems = 1;
   */
  maxItems = 0;

  /**
   * How deeply to link when calculating the blast radius for a change
   *
   * @generated from field: int32 linkDepth = 2;
   */
  linkDepth = 0;

  constructor(data?: PartialMessage<BlastRadiusConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.BlastRadiusConfig";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "maxItems", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "linkDepth", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BlastRadiusConfig {
    return new BlastRadiusConfig().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BlastRadiusConfig {
    return new BlastRadiusConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BlastRadiusConfig {
    return new BlastRadiusConfig().fromJsonString(jsonString, options);
  }

  static equals(a: BlastRadiusConfig | PlainMessage<BlastRadiusConfig> | undefined, b: BlastRadiusConfig | PlainMessage<BlastRadiusConfig> | undefined): boolean {
    return proto3.util.equals(BlastRadiusConfig, a, b);
  }
}

/**
 * @generated from message config.AccountConfig
 */
export class AccountConfig extends Message<AccountConfig> {
  /**
   * The blast radius config for this account
   *
   * @generated from field: config.BlastRadiusConfig blastRadius = 1;
   */
  blastRadius?: BlastRadiusConfig;

  constructor(data?: PartialMessage<AccountConfig>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.AccountConfig";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "blastRadius", kind: "message", T: BlastRadiusConfig },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AccountConfig {
    return new AccountConfig().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AccountConfig {
    return new AccountConfig().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AccountConfig {
    return new AccountConfig().fromJsonString(jsonString, options);
  }

  static equals(a: AccountConfig | PlainMessage<AccountConfig> | undefined, b: AccountConfig | PlainMessage<AccountConfig> | undefined): boolean {
    return proto3.util.equals(AccountConfig, a, b);
  }
}

/**
 * @generated from message config.GetAccountConfigRequest
 */
export class GetAccountConfigRequest extends Message<GetAccountConfigRequest> {
  constructor(data?: PartialMessage<GetAccountConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.GetAccountConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAccountConfigRequest {
    return new GetAccountConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAccountConfigRequest {
    return new GetAccountConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAccountConfigRequest {
    return new GetAccountConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetAccountConfigRequest | PlainMessage<GetAccountConfigRequest> | undefined, b: GetAccountConfigRequest | PlainMessage<GetAccountConfigRequest> | undefined): boolean {
    return proto3.util.equals(GetAccountConfigRequest, a, b);
  }
}

/**
 * @generated from message config.GetAccountConfigResponse
 */
export class GetAccountConfigResponse extends Message<GetAccountConfigResponse> {
  /**
   * @generated from field: config.AccountConfig config = 1;
   */
  config?: AccountConfig;

  constructor(data?: PartialMessage<GetAccountConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.GetAccountConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "config", kind: "message", T: AccountConfig },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetAccountConfigResponse {
    return new GetAccountConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetAccountConfigResponse {
    return new GetAccountConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetAccountConfigResponse {
    return new GetAccountConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetAccountConfigResponse | PlainMessage<GetAccountConfigResponse> | undefined, b: GetAccountConfigResponse | PlainMessage<GetAccountConfigResponse> | undefined): boolean {
    return proto3.util.equals(GetAccountConfigResponse, a, b);
  }
}

/**
 * Updates the account config for the user's account.
 *
 * @generated from message config.UpdateAccountConfigRequest
 */
export class UpdateAccountConfigRequest extends Message<UpdateAccountConfigRequest> {
  /**
   * @generated from field: config.AccountConfig config = 1;
   */
  config?: AccountConfig;

  constructor(data?: PartialMessage<UpdateAccountConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.UpdateAccountConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "config", kind: "message", T: AccountConfig },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateAccountConfigRequest {
    return new UpdateAccountConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateAccountConfigRequest {
    return new UpdateAccountConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateAccountConfigRequest {
    return new UpdateAccountConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateAccountConfigRequest | PlainMessage<UpdateAccountConfigRequest> | undefined, b: UpdateAccountConfigRequest | PlainMessage<UpdateAccountConfigRequest> | undefined): boolean {
    return proto3.util.equals(UpdateAccountConfigRequest, a, b);
  }
}

/**
 * @generated from message config.UpdateAccountConfigResponse
 */
export class UpdateAccountConfigResponse extends Message<UpdateAccountConfigResponse> {
  /**
   * @generated from field: config.AccountConfig config = 1;
   */
  config?: AccountConfig;

  constructor(data?: PartialMessage<UpdateAccountConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "config.UpdateAccountConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "config", kind: "message", T: AccountConfig },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateAccountConfigResponse {
    return new UpdateAccountConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateAccountConfigResponse {
    return new UpdateAccountConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateAccountConfigResponse {
    return new UpdateAccountConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdateAccountConfigResponse | PlainMessage<UpdateAccountConfigResponse> | undefined, b: UpdateAccountConfigResponse | PlainMessage<UpdateAccountConfigResponse> | undefined): boolean {
    return proto3.util.equals(UpdateAccountConfigResponse, a, b);
  }
}

