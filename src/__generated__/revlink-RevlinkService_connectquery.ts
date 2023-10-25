// @generated by protoc-gen-connect-query v0.6.0 with parameter "target=ts,import_extension=.ts"
// @generated from file revlink.proto (package revlink, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetReverseLinksRequest, GetReverseLinksResponse, IngestGatewayResponseRequest, IngestGatewayResponsesResponse } from "./revlink_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";
import { createQueryService, createUnaryHooks, UnaryFunctionsWithHooks } from "@connectrpc/connect-query";

export const typeName = "revlink.RevlinkService";

/**
 * @generated from service revlink.RevlinkService
 */
export const RevlinkService = {
  typeName: "revlink.RevlinkService",
  methods: {
    /**
     * Gets reverse links for a given item
     *
     * @generated from rpc revlink.RevlinkService.GetReverseLinks
     */
    getReverseLinks: {
      name: "GetReverseLinks",
      I: GetReverseLinksRequest,
      O: GetReverseLinksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Ingests a stream of gateway responses
     *
     * @generated from rpc revlink.RevlinkService.IngestGatewayResponses
     */
    ingestGatewayResponses: {
      name: "IngestGatewayResponses",
      I: IngestGatewayResponseRequest,
      O: IngestGatewayResponsesResponse,
      kind: MethodKind.ClientStreaming,
    },
  }
} as const;

const $queryService = createQueryService({  service: RevlinkService,});

/**
 * Gets reverse links for a given item
 *
 * @generated from rpc revlink.RevlinkService.GetReverseLinks
 */
export const getReverseLinks: UnaryFunctionsWithHooks<GetReverseLinksRequest, GetReverseLinksResponse> = {   ...$queryService.getReverseLinks,  ...createUnaryHooks($queryService.getReverseLinks)};
