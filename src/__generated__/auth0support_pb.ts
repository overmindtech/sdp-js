// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file auth0support.proto (package auth0support, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message auth0support.Auth0CreateUserRequest
 */
export class Auth0CreateUserRequest extends Message<Auth0CreateUserRequest> {
  /**
   * The Auth0 User ID
   *
   * @generated from field: string user_id = 1;
   */
  userId = "";

  /**
   * The user's email address
   *
   * @generated from field: string email = 2;
   */
  email = "";

  /**
   * The user's full name. This will be split and stored as first_name and
   * last_name internally. It is provided for convenience since some social
   * providers do not provide first_name and last_name fields. If `first_name`
   * and `last_name` are provided, this field will be ignored.
   *
   * @generated from field: string name = 3;
   */
  name = "";

  /**
   * Whether the user's email address has been verified
   *
   * @generated from field: bool email_verified = 4;
   */
  emailVerified = false;

  /**
   * The user's first name
   *
   * @generated from field: string first_name = 5;
   */
  firstName = "";

  /**
   * The user's last name
   *
   * @generated from field: string last_name = 6;
   */
  lastName = "";

  constructor(data?: PartialMessage<Auth0CreateUserRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "auth0support.Auth0CreateUserRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "email_verified", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "first_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "last_name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Auth0CreateUserRequest {
    return new Auth0CreateUserRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Auth0CreateUserRequest {
    return new Auth0CreateUserRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Auth0CreateUserRequest {
    return new Auth0CreateUserRequest().fromJsonString(jsonString, options);
  }

  static equals(a: Auth0CreateUserRequest | PlainMessage<Auth0CreateUserRequest> | undefined, b: Auth0CreateUserRequest | PlainMessage<Auth0CreateUserRequest> | undefined): boolean {
    return proto3.util.equals(Auth0CreateUserRequest, a, b);
  }
}

/**
 * @generated from message auth0support.Auth0CreateUserResponse
 */
export class Auth0CreateUserResponse extends Message<Auth0CreateUserResponse> {
  /**
   * @generated from field: string org_id = 1;
   */
  orgId = "";

  constructor(data?: PartialMessage<Auth0CreateUserResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "auth0support.Auth0CreateUserResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "org_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Auth0CreateUserResponse {
    return new Auth0CreateUserResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Auth0CreateUserResponse {
    return new Auth0CreateUserResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Auth0CreateUserResponse {
    return new Auth0CreateUserResponse().fromJsonString(jsonString, options);
  }

  static equals(a: Auth0CreateUserResponse | PlainMessage<Auth0CreateUserResponse> | undefined, b: Auth0CreateUserResponse | PlainMessage<Auth0CreateUserResponse> | undefined): boolean {
    return proto3.util.equals(Auth0CreateUserResponse, a, b);
  }
}

