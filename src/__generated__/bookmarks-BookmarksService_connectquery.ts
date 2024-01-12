// @generated by protoc-gen-connect-query v1.1.3 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (package bookmarks, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateBookmarkRequest, CreateBookmarkResponse, DeleteBookmarkRequest, DeleteBookmarkResponse, GetAffectedBookmarksRequest, GetAffectedBookmarksResponse, GetBookmarkRequest, GetBookmarkResponse, ListBookmarkResponse, ListBookmarksRequest, UpdateBookmarkRequest, UpdateBookmarkResponse } from "./bookmarks_pb.ts";

/**
 * ListBookmarks returns all bookmarks of the current user. note that this does not include the actual bookmark data, use GetBookmark for that
 *
 * @generated from rpc bookmarks.BookmarksService.ListBookmarks
 */
export const listBookmarks = {
  localName: "listBookmarks",
  name: "ListBookmarks",
  kind: MethodKind.Unary,
  I: ListBookmarksRequest,
  O: ListBookmarkResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;

/**
 * CreateBookmark creates a new bookmark
 *
 * @generated from rpc bookmarks.BookmarksService.CreateBookmark
 */
export const createBookmark = {
  localName: "createBookmark",
  name: "CreateBookmark",
  kind: MethodKind.Unary,
  I: CreateBookmarkRequest,
  O: CreateBookmarkResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;

/**
 * GetBookmark returns the bookmark with the given UUID. This can also return snapshots as bookmarks and will strip the stored items from the response.
 *
 * @generated from rpc bookmarks.BookmarksService.GetBookmark
 */
export const getBookmark = {
  localName: "getBookmark",
  name: "GetBookmark",
  kind: MethodKind.Unary,
  I: GetBookmarkRequest,
  O: GetBookmarkResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;

/**
 * @generated from rpc bookmarks.BookmarksService.UpdateBookmark
 */
export const updateBookmark = {
  localName: "updateBookmark",
  name: "UpdateBookmark",
  kind: MethodKind.Unary,
  I: UpdateBookmarkRequest,
  O: UpdateBookmarkResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;

/**
 * @generated from rpc bookmarks.BookmarksService.DeleteBookmark
 */
export const deleteBookmark = {
  localName: "deleteBookmark",
  name: "DeleteBookmark",
  kind: MethodKind.Unary,
  I: DeleteBookmarkRequest,
  O: DeleteBookmarkResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;

/**
 * a helper method to find all affected apps for a given blast radius snapshot
 *
 * @generated from rpc bookmarks.BookmarksService.GetAffectedBookmarks
 */
export const getAffectedBookmarks = {
  localName: "getAffectedBookmarks",
  name: "GetAffectedBookmarks",
  kind: MethodKind.Unary,
  I: GetAffectedBookmarksRequest,
  O: GetAffectedBookmarksResponse,
  service: {
    typeName: "bookmarks.BookmarksService"
  }
} as const;
