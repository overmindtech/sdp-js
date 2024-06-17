// @generated by protoc-gen-connect-query v1.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file revlink.proto (package revlink, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { GetReverseLinksRequest, GetReverseLinksResponse } from "./revlink_pb.ts";

/**
 * Gets reverse links for a given item
 *
 * @generated from rpc revlink.RevlinkService.GetReverseLinks
 */
export const getReverseLinks = {
  localName: "getReverseLinks",
  name: "GetReverseLinks",
  kind: MethodKind.Unary,
  I: GetReverseLinksRequest,
  O: GetReverseLinksResponse,
  service: {
    typeName: "revlink.RevlinkService"
  }
} as const;
