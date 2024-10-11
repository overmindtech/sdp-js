// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts,import_extension=.ts"
// @generated from file auth0support.proto (package auth0support, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { Auth0CreateUserRequest, Auth0CreateUserResponse } from "./auth0support_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";
import { AdminKeepaliveSourcesRequest, KeepaliveSourcesResponse } from "./account_pb.ts";

/**
 * The auth0 support service contains the endpoints used by Auth0 Actions to
 * post updates and receive additional information into Auth0.
 *
 * @generated from service auth0support.Auth0Support
 */
export const Auth0Support = {
  typeName: "auth0support.Auth0Support",
  methods: {
    /**
     * create a new user on first login
     *
     * @generated from rpc auth0support.Auth0Support.CreateUser
     */
    createUser: {
      name: "CreateUser",
      I: Auth0CreateUserRequest,
      O: Auth0CreateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Updates sources to keep them running in the background. This is called on
     * login by auth0 to give us a chance to boot up sources while the app is
     * loading.
     *
     * @generated from rpc auth0support.Auth0Support.KeepaliveSources
     */
    keepaliveSources: {
      name: "KeepaliveSources",
      I: AdminKeepaliveSourcesRequest,
      O: KeepaliveSourcesResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

