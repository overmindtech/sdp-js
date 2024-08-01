// @generated by protoc-gen-connect-es v1.4.0 with parameter "target=ts,import_extension=.ts"
// @generated from file config.proto (package config, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { CreateHcpConfigRequest, CreateHcpConfigResponse, DeleteHcpConfigRequest, DeleteHcpConfigResponse, GetAccountConfigRequest, GetAccountConfigResponse, GetHcpConfigRequest, GetHcpConfigResponse, UpdateAccountConfigRequest, UpdateAccountConfigResponse } from "./config_pb.ts";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * a simple key-value store to store configuration data for accounts and users (TODO)
 *
 * @generated from service config.ConfigurationService
 */
export const ConfigurationService = {
  typeName: "config.ConfigurationService",
  methods: {
    /**
     * Get the account config for the user's account
     *
     * @generated from rpc config.ConfigurationService.GetAccountConfig
     */
    getAccountConfig: {
      name: "GetAccountConfig",
      I: GetAccountConfigRequest,
      O: GetAccountConfigResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Update the account config for the user's account
     *
     * @generated from rpc config.ConfigurationService.UpdateAccountConfig
     */
    updateAccountConfig: {
      name: "UpdateAccountConfig",
      I: UpdateAccountConfigRequest,
      O: UpdateAccountConfigResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Create a new HCP Terraform config for the user's account. This follows
     * the same flow as CreateAPIKey, to create a new API key that is then used
     * for the HCP Terraform endpoint URL.
     *
     * @generated from rpc config.ConfigurationService.CreateHcpConfig
     */
    createHcpConfig: {
      name: "CreateHcpConfig",
      I: CreateHcpConfigRequest,
      O: CreateHcpConfigResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Get the existing HCP Terraform config for the user's account.
     *
     * @generated from rpc config.ConfigurationService.GetHcpConfig
     */
    getHcpConfig: {
      name: "GetHcpConfig",
      I: GetHcpConfigRequest,
      O: GetHcpConfigResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove the existing HCP Terraform config from the user's account.
     *
     * @generated from rpc config.ConfigurationService.DeleteHcpConfig
     */
    deleteHcpConfig: {
      name: "DeleteHcpConfig",
      I: DeleteHcpConfigRequest,
      O: DeleteHcpConfigResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

