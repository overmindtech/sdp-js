// @generated by protoc-gen-es v1.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file invites.proto (package invites, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message invites.CreateInviteRequest
 */
export class CreateInviteRequest extends Message<CreateInviteRequest> {
  /**
   * @generated from field: repeated string emails = 1;
   */
  emails: string[] = [];

  constructor(data?: PartialMessage<CreateInviteRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.CreateInviteRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "emails", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateInviteRequest {
    return new CreateInviteRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateInviteRequest {
    return new CreateInviteRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateInviteRequest {
    return new CreateInviteRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreateInviteRequest | PlainMessage<CreateInviteRequest> | undefined, b: CreateInviteRequest | PlainMessage<CreateInviteRequest> | undefined): boolean {
    return proto3.util.equals(CreateInviteRequest, a, b);
  }
}

/**
 * @generated from message invites.CreateInviteResponse
 */
export class CreateInviteResponse extends Message<CreateInviteResponse> {
  constructor(data?: PartialMessage<CreateInviteResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.CreateInviteResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreateInviteResponse {
    return new CreateInviteResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreateInviteResponse {
    return new CreateInviteResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreateInviteResponse {
    return new CreateInviteResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreateInviteResponse | PlainMessage<CreateInviteResponse> | undefined, b: CreateInviteResponse | PlainMessage<CreateInviteResponse> | undefined): boolean {
    return proto3.util.equals(CreateInviteResponse, a, b);
  }
}

/**
 * @generated from message invites.Invite
 */
export class Invite extends Message<Invite> {
  /**
   * @generated from field: string email = 1;
   */
  email = "";

  /**
   * @generated from field: invites.Invite.InviteStatus status = 2;
   */
  status = Invite_InviteStatus.UNSPECIFIED;

  constructor(data?: PartialMessage<Invite>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.Invite";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "status", kind: "enum", T: proto3.getEnumType(Invite_InviteStatus) },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Invite {
    return new Invite().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Invite {
    return new Invite().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Invite {
    return new Invite().fromJsonString(jsonString, options);
  }

  static equals(a: Invite | PlainMessage<Invite> | undefined, b: Invite | PlainMessage<Invite> | undefined): boolean {
    return proto3.util.equals(Invite, a, b);
  }
}

/**
 * @generated from enum invites.Invite.InviteStatus
 */
export enum Invite_InviteStatus {
  /**
   * @generated from enum value: INVITE_STATUS_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * The user has been invited but has not yet accepted
   *
   * @generated from enum value: INVITE_STATUS_INVITED = 1;
   */
  INVITED = 1,

  /**
   * The user has accepted the invitation
   *
   * @generated from enum value: INVITE_STATUS_ACCEPTED = 2;
   */
  ACCEPTED = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Invite_InviteStatus)
proto3.util.setEnumType(Invite_InviteStatus, "invites.Invite.InviteStatus", [
  { no: 0, name: "INVITE_STATUS_UNSPECIFIED" },
  { no: 1, name: "INVITE_STATUS_INVITED" },
  { no: 2, name: "INVITE_STATUS_ACCEPTED" },
]);

/**
 * @generated from message invites.ListInvitesRequest
 */
export class ListInvitesRequest extends Message<ListInvitesRequest> {
  constructor(data?: PartialMessage<ListInvitesRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.ListInvitesRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListInvitesRequest {
    return new ListInvitesRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListInvitesRequest {
    return new ListInvitesRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListInvitesRequest {
    return new ListInvitesRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListInvitesRequest | PlainMessage<ListInvitesRequest> | undefined, b: ListInvitesRequest | PlainMessage<ListInvitesRequest> | undefined): boolean {
    return proto3.util.equals(ListInvitesRequest, a, b);
  }
}

/**
 * @generated from message invites.ListInvitesResponse
 */
export class ListInvitesResponse extends Message<ListInvitesResponse> {
  /**
   * @generated from field: repeated invites.Invite invites = 1;
   */
  invites: Invite[] = [];

  constructor(data?: PartialMessage<ListInvitesResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.ListInvitesResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "invites", kind: "message", T: Invite, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListInvitesResponse {
    return new ListInvitesResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListInvitesResponse {
    return new ListInvitesResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListInvitesResponse {
    return new ListInvitesResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListInvitesResponse | PlainMessage<ListInvitesResponse> | undefined, b: ListInvitesResponse | PlainMessage<ListInvitesResponse> | undefined): boolean {
    return proto3.util.equals(ListInvitesResponse, a, b);
  }
}

/**
 * @generated from message invites.RevokeInviteRequest
 */
export class RevokeInviteRequest extends Message<RevokeInviteRequest> {
  /**
   * @generated from field: string email = 1;
   */
  email = "";

  constructor(data?: PartialMessage<RevokeInviteRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.RevokeInviteRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "email", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RevokeInviteRequest {
    return new RevokeInviteRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RevokeInviteRequest {
    return new RevokeInviteRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RevokeInviteRequest {
    return new RevokeInviteRequest().fromJsonString(jsonString, options);
  }

  static equals(a: RevokeInviteRequest | PlainMessage<RevokeInviteRequest> | undefined, b: RevokeInviteRequest | PlainMessage<RevokeInviteRequest> | undefined): boolean {
    return proto3.util.equals(RevokeInviteRequest, a, b);
  }
}

/**
 * @generated from message invites.RevokeInviteResponse
 */
export class RevokeInviteResponse extends Message<RevokeInviteResponse> {
  constructor(data?: PartialMessage<RevokeInviteResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "invites.RevokeInviteResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RevokeInviteResponse {
    return new RevokeInviteResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RevokeInviteResponse {
    return new RevokeInviteResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RevokeInviteResponse {
    return new RevokeInviteResponse().fromJsonString(jsonString, options);
  }

  static equals(a: RevokeInviteResponse | PlainMessage<RevokeInviteResponse> | undefined, b: RevokeInviteResponse | PlainMessage<RevokeInviteResponse> | undefined): boolean {
    return proto3.util.equals(RevokeInviteResponse, a, b);
  }
}

