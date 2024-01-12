// @generated by protoc-gen-connect-query v1.1.3 with parameter "target=ts,import_extension=.ts"
// @generated from file invites.proto (package invites, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateInviteRequest, CreateInviteResponse, ListInvitesRequest, ListInvitesResponse, RevokeInviteRequest, RevokeInviteResponse } from "./invites_pb.ts";

/**
 * @generated from rpc invites.InviteService.CreateInvite
 */
export const createInvite = {
  localName: "createInvite",
  name: "CreateInvite",
  kind: MethodKind.Unary,
  I: CreateInviteRequest,
  O: CreateInviteResponse,
  service: {
    typeName: "invites.InviteService"
  }
} as const;

/**
 * @generated from rpc invites.InviteService.ListInvites
 */
export const listInvites = {
  localName: "listInvites",
  name: "ListInvites",
  kind: MethodKind.Unary,
  I: ListInvitesRequest,
  O: ListInvitesResponse,
  service: {
    typeName: "invites.InviteService"
  }
} as const;

/**
 * @generated from rpc invites.InviteService.RevokeInvite
 */
export const revokeInvite = {
  localName: "revokeInvite",
  name: "RevokeInvite",
  kind: MethodKind.Unary,
  I: RevokeInviteRequest,
  O: RevokeInviteResponse,
  service: {
    typeName: "invites.InviteService"
  }
} as const;
