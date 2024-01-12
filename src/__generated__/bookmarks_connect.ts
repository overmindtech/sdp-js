// @generated by protoc-gen-connect-es v1.3.0 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (package bookmarks, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateBookmarkRequest, CreateBookmarkResponse, DeleteBookmarkRequest, DeleteBookmarkResponse, GetAffectedBookmarksRequest, GetAffectedBookmarksResponse, GetBookmarkRequest, GetBookmarkResponse, ListBookmarkResponse, ListBookmarksRequest, UpdateBookmarkRequest, UpdateBookmarkResponse } from "./bookmarks_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service bookmarks.BookmarksService
 */
export const BookmarksService = {
  typeName: "bookmarks.BookmarksService",
  methods: {
    /**
     * ListBookmarks returns all bookmarks of the current user. note that this does not include the actual bookmark data, use GetBookmark for that
     *
     * @generated from rpc bookmarks.BookmarksService.ListBookmarks
     */
    listBookmarks: {
      name: "ListBookmarks",
      I: ListBookmarksRequest,
      O: ListBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * CreateBookmark creates a new bookmark
     *
     * @generated from rpc bookmarks.BookmarksService.CreateBookmark
     */
    createBookmark: {
      name: "CreateBookmark",
      I: CreateBookmarkRequest,
      O: CreateBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetBookmark returns the bookmark with the given UUID. This can also return snapshots as bookmarks and will strip the stored items from the response.
     *
     * @generated from rpc bookmarks.BookmarksService.GetBookmark
     */
    getBookmark: {
      name: "GetBookmark",
      I: GetBookmarkRequest,
      O: GetBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bookmarks.BookmarksService.UpdateBookmark
     */
    updateBookmark: {
      name: "UpdateBookmark",
      I: UpdateBookmarkRequest,
      O: UpdateBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc bookmarks.BookmarksService.DeleteBookmark
     */
    deleteBookmark: {
      name: "DeleteBookmark",
      I: DeleteBookmarkRequest,
      O: DeleteBookmarkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * a helper method to find all affected apps for a given blast radius snapshot
     *
     * @generated from rpc bookmarks.BookmarksService.GetAffectedBookmarks
     */
    getAffectedBookmarks: {
      name: "GetAffectedBookmarks",
      I: GetAffectedBookmarksRequest,
      O: GetAffectedBookmarksResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

