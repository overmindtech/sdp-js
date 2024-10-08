// @generated by protoc-gen-connect-query v1.4.2 with parameter "target=ts,import_extension=.ts"
// @generated from file auth0support.proto (package auth0support, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { Auth0CreateUserRequest, Auth0CreateUserResponse } from "./auth0support_pb.ts";
import { AdminKeepaliveSourcesRequest, KeepaliveSourcesResponse } from "./account_pb.ts";

/**
 * create a new user on first login
 *
 * @generated from rpc auth0support.Auth0Support.CreateUser
 */
export const createUser = {
  localName: "createUser",
  name: "CreateUser",
  kind: MethodKind.Unary,
  I: Auth0CreateUserRequest,
  O: Auth0CreateUserResponse,
  service: {
    typeName: "auth0support.Auth0Support"
  }
} as const;

/**
 * Updates sources to keep them running in the background. This is called on
 * login by auth0 to give us a chance to boot up sources while the app is
 * loading.
 *
 * @generated from rpc auth0support.Auth0Support.KeepaliveSources
 */
export const keepaliveSources = {
  localName: "keepaliveSources",
  name: "KeepaliveSources",
  kind: MethodKind.Unary,
  I: AdminKeepaliveSourcesRequest,
  O: KeepaliveSourcesResponse,
  service: {
    typeName: "auth0support.Auth0Support"
  }
} as const;
