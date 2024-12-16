// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file invites.proto (package invites, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_protobuf_struct, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file invites.proto.
 */
export const file_invites: GenFile = /*@__PURE__*/
  fileDesc("Cg1pbnZpdGVzLnByb3RvEgdpbnZpdGVzIiUKE0NyZWF0ZUludml0ZVJlcXVlc3QSDgoGZW1haWxzGAEgAygJIhYKFENyZWF0ZUludml0ZVJlc3BvbnNlIqsBCgZJbnZpdGUSDQoFZW1haWwYASABKAkSLAoGc3RhdHVzGAIgASgOMhwuaW52aXRlcy5JbnZpdGUuSW52aXRlU3RhdHVzImQKDEludml0ZVN0YXR1cxIdChlJTlZJVEVfU1RBVFVTX1VOU1BFQ0lGSUVEEAASGQoVSU5WSVRFX1NUQVRVU19JTlZJVEVEEAESGgoWSU5WSVRFX1NUQVRVU19BQ0NFUFRFRBACIhQKEkxpc3RJbnZpdGVzUmVxdWVzdCI3ChNMaXN0SW52aXRlc1Jlc3BvbnNlEiAKB2ludml0ZXMYASADKAsyDy5pbnZpdGVzLkludml0ZSIkChNSZXZva2VJbnZpdGVSZXF1ZXN0Eg0KBWVtYWlsGAEgASgJIhYKFFJldm9rZUludml0ZVJlc3BvbnNlIiQKE1Jlc2VuZEludml0ZVJlcXVlc3QSDQoFZW1haWwYASABKAkiFgoUUmVzZW5kSW52aXRlUmVzcG9uc2UywAIKDUludml0ZVNlcnZpY2USSwoMQ3JlYXRlSW52aXRlEhwuaW52aXRlcy5DcmVhdGVJbnZpdGVSZXF1ZXN0Gh0uaW52aXRlcy5DcmVhdGVJbnZpdGVSZXNwb25zZRJICgtMaXN0SW52aXRlcxIbLmludml0ZXMuTGlzdEludml0ZXNSZXF1ZXN0GhwuaW52aXRlcy5MaXN0SW52aXRlc1Jlc3BvbnNlEksKDFJldm9rZUludml0ZRIcLmludml0ZXMuUmV2b2tlSW52aXRlUmVxdWVzdBodLmludml0ZXMuUmV2b2tlSW52aXRlUmVzcG9uc2USSwoMUmVzZW5kSW52aXRlEhwuaW52aXRlcy5SZXNlbmRJbnZpdGVSZXF1ZXN0Gh0uaW52aXRlcy5SZXNlbmRJbnZpdGVSZXNwb25zZUIkWiJnaXRodWIuY29tL292ZXJtaW5kdGVjaC9zZHAtZ287c2RwYgZwcm90bzM", [file_google_protobuf_struct, file_google_protobuf_timestamp]);

/**
 * @generated from message invites.CreateInviteRequest
 */
export type CreateInviteRequest = Message<"invites.CreateInviteRequest"> & {
  /**
   * @generated from field: repeated string emails = 1;
   */
  emails: string[];
};

/**
 * Describes the message invites.CreateInviteRequest.
 * Use `create(CreateInviteRequestSchema)` to create a new message.
 */
export const CreateInviteRequestSchema: GenMessage<CreateInviteRequest> = /*@__PURE__*/
  messageDesc(file_invites, 0);

/**
 * @generated from message invites.CreateInviteResponse
 */
export type CreateInviteResponse = Message<"invites.CreateInviteResponse"> & {
};

/**
 * Describes the message invites.CreateInviteResponse.
 * Use `create(CreateInviteResponseSchema)` to create a new message.
 */
export const CreateInviteResponseSchema: GenMessage<CreateInviteResponse> = /*@__PURE__*/
  messageDesc(file_invites, 1);

/**
 * @generated from message invites.Invite
 */
export type Invite = Message<"invites.Invite"> & {
  /**
   * @generated from field: string email = 1;
   */
  email: string;

  /**
   * @generated from field: invites.Invite.InviteStatus status = 2;
   */
  status: Invite_InviteStatus;
};

/**
 * Describes the message invites.Invite.
 * Use `create(InviteSchema)` to create a new message.
 */
export const InviteSchema: GenMessage<Invite> = /*@__PURE__*/
  messageDesc(file_invites, 2);

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

/**
 * Describes the enum invites.Invite.InviteStatus.
 */
export const Invite_InviteStatusSchema: GenEnum<Invite_InviteStatus> = /*@__PURE__*/
  enumDesc(file_invites, 2, 0);

/**
 * @generated from message invites.ListInvitesRequest
 */
export type ListInvitesRequest = Message<"invites.ListInvitesRequest"> & {
};

/**
 * Describes the message invites.ListInvitesRequest.
 * Use `create(ListInvitesRequestSchema)` to create a new message.
 */
export const ListInvitesRequestSchema: GenMessage<ListInvitesRequest> = /*@__PURE__*/
  messageDesc(file_invites, 3);

/**
 * @generated from message invites.ListInvitesResponse
 */
export type ListInvitesResponse = Message<"invites.ListInvitesResponse"> & {
  /**
   * @generated from field: repeated invites.Invite invites = 1;
   */
  invites: Invite[];
};

/**
 * Describes the message invites.ListInvitesResponse.
 * Use `create(ListInvitesResponseSchema)` to create a new message.
 */
export const ListInvitesResponseSchema: GenMessage<ListInvitesResponse> = /*@__PURE__*/
  messageDesc(file_invites, 4);

/**
 * @generated from message invites.RevokeInviteRequest
 */
export type RevokeInviteRequest = Message<"invites.RevokeInviteRequest"> & {
  /**
   * @generated from field: string email = 1;
   */
  email: string;
};

/**
 * Describes the message invites.RevokeInviteRequest.
 * Use `create(RevokeInviteRequestSchema)` to create a new message.
 */
export const RevokeInviteRequestSchema: GenMessage<RevokeInviteRequest> = /*@__PURE__*/
  messageDesc(file_invites, 5);

/**
 * @generated from message invites.RevokeInviteResponse
 */
export type RevokeInviteResponse = Message<"invites.RevokeInviteResponse"> & {
};

/**
 * Describes the message invites.RevokeInviteResponse.
 * Use `create(RevokeInviteResponseSchema)` to create a new message.
 */
export const RevokeInviteResponseSchema: GenMessage<RevokeInviteResponse> = /*@__PURE__*/
  messageDesc(file_invites, 6);

/**
 * @generated from message invites.ResendInviteRequest
 */
export type ResendInviteRequest = Message<"invites.ResendInviteRequest"> & {
  /**
   * @generated from field: string email = 1;
   */
  email: string;
};

/**
 * Describes the message invites.ResendInviteRequest.
 * Use `create(ResendInviteRequestSchema)` to create a new message.
 */
export const ResendInviteRequestSchema: GenMessage<ResendInviteRequest> = /*@__PURE__*/
  messageDesc(file_invites, 7);

/**
 * @generated from message invites.ResendInviteResponse
 */
export type ResendInviteResponse = Message<"invites.ResendInviteResponse"> & {
};

/**
 * Describes the message invites.ResendInviteResponse.
 * Use `create(ResendInviteResponseSchema)` to create a new message.
 */
export const ResendInviteResponseSchema: GenMessage<ResendInviteResponse> = /*@__PURE__*/
  messageDesc(file_invites, 8);

/**
 * provides all operations for inviting people to an organization
 *
 * @generated from service invites.InviteService
 */
export const InviteService: GenService<{
  /**
   * @generated from rpc invites.InviteService.CreateInvite
   */
  createInvite: {
    methodKind: "unary";
    input: typeof CreateInviteRequestSchema;
    output: typeof CreateInviteResponseSchema;
  },
  /**
   * @generated from rpc invites.InviteService.ListInvites
   */
  listInvites: {
    methodKind: "unary";
    input: typeof ListInvitesRequestSchema;
    output: typeof ListInvitesResponseSchema;
  },
  /**
   * @generated from rpc invites.InviteService.RevokeInvite
   */
  revokeInvite: {
    methodKind: "unary";
    input: typeof RevokeInviteRequestSchema;
    output: typeof RevokeInviteResponseSchema;
  },
  /**
   * @generated from rpc invites.InviteService.ResendInvite
   */
  resendInvite: {
    methodKind: "unary";
    input: typeof ResendInviteRequestSchema;
    output: typeof ResendInviteResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_invites, 0);

