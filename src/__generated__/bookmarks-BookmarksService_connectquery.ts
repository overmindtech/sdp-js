// @generated by protoc-gen-connect-query v0.4.1 with parameter "target=ts,import_extension=.ts"
// @generated from file bookmarks.proto (package bookmarks, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { createQueryService } from "@bufbuild/connect-query";
import { MethodKind } from "@bufbuild/protobuf";
import { CreateBookmarkRequest, CreateBookmarkResponse, DeleteBookmarkRequest, DeleteBookmarkResponse, GetAffectedBookmarksRequest, GetAffectedBookmarksResponse, GetBookmarkRequest, GetBookmarkResponse, ListBookmarkResponse, ListBookmarksRequest, UpdateBookmarkRequest, UpdateBookmarkResponse } from "./bookmarks_pb";

export const typeName = "bookmarks.BookmarksService";

/**
 * @generated from rpc bookmarks.BookmarksService.ListBookmarks
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
    typeName: "bookmarks.BookmarksService",
  },
}).listBookmarks;

/**
 * @generated from rpc bookmarks.BookmarksService.CreateBookmark
 */
export const createBookmark = createQueryService({
  service: {
    methods: {
      createBookmark: {
        name: "CreateBookmark",
        kind: MethodKind.Unary,
        I: CreateBookmarkRequest,
        O: CreateBookmarkResponse,
      },
    },
    typeName: "bookmarks.BookmarksService",
  },
}).createBookmark;

/**
 * @generated from rpc bookmarks.BookmarksService.GetBookmark
 */
export const getBookmark = createQueryService({
  service: {
    methods: {
      getBookmark: {
        name: "GetBookmark",
        kind: MethodKind.Unary,
        I: GetBookmarkRequest,
        O: GetBookmarkResponse,
      },
    },
    typeName: "bookmarks.BookmarksService",
  },
}).getBookmark;

/**
 * @generated from rpc bookmarks.BookmarksService.UpdateBookmark
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
    typeName: "bookmarks.BookmarksService",
  },
}).updateBookmark;

/**
 * @generated from rpc bookmarks.BookmarksService.DeleteBookmark
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
    typeName: "bookmarks.BookmarksService",
  },
}).deleteBookmark;

/**
 * a helper method to find all affected apps for a given blast radius snapshot
 *
 * @generated from rpc bookmarks.BookmarksService.GetAffectedBookmarks
 */
export const getAffectedBookmarks = createQueryService({
  service: {
    methods: {
      getAffectedBookmarks: {
        name: "GetAffectedBookmarks",
        kind: MethodKind.Unary,
        I: GetAffectedBookmarksRequest,
        O: GetAffectedBookmarksResponse,
      },
    },
    typeName: "bookmarks.BookmarksService",
  },
}).getAffectedBookmarks;
