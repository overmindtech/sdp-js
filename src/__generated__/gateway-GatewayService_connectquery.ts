// @generated by protoc-gen-connect-query v0.1.1 with parameter "target=ts,import_extension=.ts"
// @generated from file gateway.proto (package gateway, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { DeleteBookmarkRequest, DeleteBookmarkResponse, ListBookmarkResponse, ListBookmarksRequest, UpdateBookmarkRequest, UpdateBookmarkResponse } from "./bookmarks_pb.ts";

export const typeName = "gateway.GatewayService";

/**
 * @generated from rpc gateway.GatewayService.ListBookmarks
 */
export const listBookmarks = createQueryService({
  service: {
    methods: {
      listBookmarks: {
        name: "ListBookmarks",
        kind: MethodKind.Unary,
        I: ListBookmarksRequest,
        O: ListBookmarkResponse,
      },
    },
    typeName: "gateway.GatewayService",
  },
}).listBookmarks;

/**
 * @generated from rpc gateway.GatewayService.UpdateBookmark
 */
export const updateBookmark = createQueryService({
  service: {
    methods: {
      updateBookmark: {
        name: "UpdateBookmark",
        kind: MethodKind.Unary,
        I: UpdateBookmarkRequest,
        O: UpdateBookmarkResponse,
      },
    },
    typeName: "gateway.GatewayService",
  },
}).updateBookmark;

/**
 * @generated from rpc gateway.GatewayService.DeleteBookmark
 */
export const deleteBookmark = createQueryService({
  service: {
    methods: {
      deleteBookmark: {
        name: "DeleteBookmark",
        kind: MethodKind.Unary,
        I: DeleteBookmarkRequest,
        O: DeleteBookmarkResponse,
      },
    },
    typeName: "gateway.GatewayService",
  },
}).deleteBookmark;