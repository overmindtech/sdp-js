// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file cli.proto (package cli, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message cli.GetConfigRequest
 */
export class GetConfigRequest extends Message<GetConfigRequest> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  constructor(data?: PartialMessage<GetConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cli.GetConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetConfigRequest {
    return new GetConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetConfigRequest {
    return new GetConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetConfigRequest {
    return new GetConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: GetConfigRequest | PlainMessage<GetConfigRequest> | undefined, b: GetConfigRequest | PlainMessage<GetConfigRequest> | undefined): boolean {
    return proto3.util.equals(GetConfigRequest, a, b);
  }
}

/**
 * @generated from message cli.GetConfigResponse
 */
export class GetConfigResponse extends Message<GetConfigResponse> {
  /**
   * @generated from field: string value = 1;
   */
  value = "";

  constructor(data?: PartialMessage<GetConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cli.GetConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetConfigResponse {
    return new GetConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetConfigResponse {
    return new GetConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetConfigResponse {
    return new GetConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: GetConfigResponse | PlainMessage<GetConfigResponse> | undefined, b: GetConfigResponse | PlainMessage<GetConfigResponse> | undefined): boolean {
    return proto3.util.equals(GetConfigResponse, a, b);
  }
}

/**
 * @generated from message cli.SetConfigRequest
 */
export class SetConfigRequest extends Message<SetConfigRequest> {
  /**
   * @generated from field: string key = 1;
   */
  key = "";

  /**
   * @generated from field: string value = 2;
   */
  value = "";

  constructor(data?: PartialMessage<SetConfigRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cli.SetConfigRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "value", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetConfigRequest {
    return new SetConfigRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetConfigRequest {
    return new SetConfigRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetConfigRequest {
    return new SetConfigRequest().fromJsonString(jsonString, options);
  }

  static equals(a: SetConfigRequest | PlainMessage<SetConfigRequest> | undefined, b: SetConfigRequest | PlainMessage<SetConfigRequest> | undefined): boolean {
    return proto3.util.equals(SetConfigRequest, a, b);
  }
}

/**
 * @generated from message cli.SetConfigResponse
 */
export class SetConfigResponse extends Message<SetConfigResponse> {
  constructor(data?: PartialMessage<SetConfigResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "cli.SetConfigResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SetConfigResponse {
    return new SetConfigResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SetConfigResponse {
    return new SetConfigResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SetConfigResponse {
    return new SetConfigResponse().fromJsonString(jsonString, options);
  }

  static equals(a: SetConfigResponse | PlainMessage<SetConfigResponse> | undefined, b: SetConfigResponse | PlainMessage<SetConfigResponse> | undefined): boolean {
    return proto3.util.equals(SetConfigResponse, a, b);
  }
}

