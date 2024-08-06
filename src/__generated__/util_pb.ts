// @generated by protoc-gen-es v1.10.0 with parameter "target=ts,import_extension=.ts"
// @generated from file util.proto (syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message PaginationRequest
 */
export class PaginationRequest extends Message<PaginationRequest> {
  /**
   * The number of items to return in a single page. The minimum is 10 and the maximum is 100.
   *
   * @generated from field: int32 pageSize = 1;
   */
  pageSize = 0;

  /**
   * The page number to return. the first page is 1.
   * if the page number is larger than the total number of pages, the last page is returned.
   * if the page number is negative, the first page 1 is returned.
   *
   * @generated from field: int32 page = 2;
   */
  page = 0;

  constructor(data?: PartialMessage<PaginationRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "PaginationRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pageSize", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "page", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PaginationRequest {
    return new PaginationRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PaginationRequest {
    return new PaginationRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PaginationRequest {
    return new PaginationRequest().fromJsonString(jsonString, options);
  }

  static equals(a: PaginationRequest | PlainMessage<PaginationRequest> | undefined, b: PaginationRequest | PlainMessage<PaginationRequest> | undefined): boolean {
    return proto3.util.equals(PaginationRequest, a, b);
  }
}

/**
 * @generated from message PaginationResponse
 */
export class PaginationResponse extends Message<PaginationResponse> {
  /**
   * The number of items in the current page
   *
   * @generated from field: int32 pageSize = 1;
   */
  pageSize = 0;

  /**
   * The total number of items available. Expensive to calculate https://www.cybertec-postgresql.com/en/pagination-problem-total-result-count/
   * this is done as a separate query
   *
   * @generated from field: int32 totalItems = 2;
   */
  totalItems = 0;

  /**
   * The current page number, NB if the user provided a negative page number, this will be 1, if the user provided a page number larger than the total number of pages, this will be the last page.
   *
   * @generated from field: int32 page = 3;
   */
  page = 0;

  /**
   * The total number of pages available. based on the totalItems and pageSize.
   *
   * @generated from field: int32 totalPages = 4;
   */
  totalPages = 0;

  constructor(data?: PartialMessage<PaginationResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "PaginationResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pageSize", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "totalItems", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "page", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "totalPages", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PaginationResponse {
    return new PaginationResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PaginationResponse {
    return new PaginationResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PaginationResponse {
    return new PaginationResponse().fromJsonString(jsonString, options);
  }

  static equals(a: PaginationResponse | PlainMessage<PaginationResponse> | undefined, b: PaginationResponse | PlainMessage<PaginationResponse> | undefined): boolean {
    return proto3.util.equals(PaginationResponse, a, b);
  }
}

