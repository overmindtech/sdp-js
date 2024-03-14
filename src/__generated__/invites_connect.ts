// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=.ts"
// @generated from file invites.proto (package invites, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateInviteRequest, CreateInviteResponse, ListInvitesRequest, ListInvitesResponse, ResendInviteRequest, ResendInviteResponse, RevokeInviteRequest, RevokeInviteResponse } from "./invites_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * provides all operations for inviting people to an organization
 *
 * @generated from service invites.InviteService
 */
export const InviteService = {
  typeName: "invites.InviteService",
  methods: {
    /**
     * @generated from rpc invites.InviteService.CreateInvite
     */
    createInvite: {
      name: "CreateInvite",
      I: CreateInviteRequest,
      O: CreateInviteResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc invites.InviteService.ListInvites
     */
    listInvites: {
      name: "ListInvites",
      I: ListInvitesRequest,
      O: ListInvitesResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc invites.InviteService.RevokeInvite
     */
    revokeInvite: {
      name: "RevokeInvite",
      I: RevokeInviteRequest,
      O: RevokeInviteResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc invites.InviteService.ResendInvite
     */
    resendInvite: {
      name: "ResendInvite",
      I: ResendInviteRequest,
      O: ResendInviteResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

