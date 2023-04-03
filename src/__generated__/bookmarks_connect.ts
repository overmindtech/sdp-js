// @generated by protoc-gen-connect-es v0.8.4 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateBookmarkRequest, CreateBookmarkResponse, DeleteBookmarkRequest, DeleteBookmarkResponse, GetBookmarkRequest, GetBookmarkResponse, ListBookmarkResponse, ListBookmarksRequest, UpdateBookmarkRequest, UpdateBookmarkResponse } from "./bookmarks_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service BookmarksService
 */
export const BookmarksService = {
  typeName: "BookmarksService",
  methods: {
    /**
     * @generated from rpc BookmarksService.ListBookmarks
     */
    listBookmarks: {
      name: "ListBookmarks",
      I: ListBookmarksRequest,
      O: ListBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc BookmarksService.CreateBookmark
     */
    createBookmark: {
      name: "CreateBookmark",
      I: CreateBookmarkRequest,
      O: CreateBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc BookmarksService.GetBookmark
     */
    getBookmark: {
      name: "GetBookmark",
      I: GetBookmarkRequest,
      O: GetBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc BookmarksService.UpdateBookmark
     */
    updateBookmark: {
      name: "UpdateBookmark",
      I: UpdateBookmarkRequest,
      O: UpdateBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc BookmarksService.DeleteBookmark
     */
    deleteBookmark: {
      name: "DeleteBookmark",
      I: DeleteBookmarkRequest,
      O: DeleteBookmarkResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

