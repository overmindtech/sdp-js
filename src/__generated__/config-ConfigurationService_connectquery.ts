// @generated by protoc-gen-connect-query v1.4.2 with parameter "target=ts,import_extension=.ts"
// @generated from file config.proto (package config, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { MethodKind } from "@bufbuild/protobuf";
import { CreateHcpConfigRequest, CreateHcpConfigResponse, DeleteHcpConfigRequest, DeleteHcpConfigResponse, GetAccountConfigRequest, GetAccountConfigResponse, GetHcpConfigRequest, GetHcpConfigResponse, UpdateAccountConfigRequest, UpdateAccountConfigResponse } from "./config_pb.ts";

/**
 * Get the account config for the user's account
 *
 * @generated from rpc config.ConfigurationService.GetAccountConfig
 */
export const getAccountConfig = {
  localName: "getAccountConfig",
  name: "GetAccountConfig",
  kind: MethodKind.Unary,
  I: GetAccountConfigRequest,
  O: GetAccountConfigResponse,
  service: {
    typeName: "config.ConfigurationService"
  }
} as const;

/**
 * Update the account config for the user's account
 *
 * @generated from rpc config.ConfigurationService.UpdateAccountConfig
 */
export const updateAccountConfig = {
  localName: "updateAccountConfig",
  name: "UpdateAccountConfig",
  kind: MethodKind.Unary,
  I: UpdateAccountConfigRequest,
  O: UpdateAccountConfigResponse,
  service: {
    typeName: "config.ConfigurationService"
  }
} as const;

/**
 * Create a new HCP Terraform config for the user's account. This follows
 * the same flow as CreateAPIKey, to create a new API key that is then used
 * for the HCP Terraform endpoint URL.
 *
 * @generated from rpc config.ConfigurationService.CreateHcpConfig
 */
export const createHcpConfig = {
  localName: "createHcpConfig",
  name: "CreateHcpConfig",
  kind: MethodKind.Unary,
  I: CreateHcpConfigRequest,
  O: CreateHcpConfigResponse,
  service: {
    typeName: "config.ConfigurationService"
  }
} as const;

/**
 * Get the existing HCP Terraform config for the user's account.
 *
 * @generated from rpc config.ConfigurationService.GetHcpConfig
 */
export const getHcpConfig = {
  localName: "getHcpConfig",
  name: "GetHcpConfig",
  kind: MethodKind.Unary,
  I: GetHcpConfigRequest,
  O: GetHcpConfigResponse,
  service: {
    typeName: "config.ConfigurationService"
  }
} as const;

/**
 * Remove the existing HCP Terraform config from the user's account.
 *
 * @generated from rpc config.ConfigurationService.DeleteHcpConfig
 */
export const deleteHcpConfig = {
  localName: "deleteHcpConfig",
  name: "DeleteHcpConfig",
  kind: MethodKind.Unary,
  I: DeleteHcpConfigRequest,
  O: DeleteHcpConfigResponse,
  service: {
    typeName: "config.ConfigurationService"
  }
} as const;
