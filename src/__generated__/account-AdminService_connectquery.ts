// @generated by protoc-gen-connect-query v2.0.1 with parameter "target=ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */

import { AdminService } from "./account_pb";

/**
 * Lists the details of all NATS Accounts
 *
 * @generated from rpc account.AdminService.ListAccounts
 */
export const listAccounts = AdminService.method.listAccounts;

/**
 * Creates a new account, public_nkey will be autogenerated
 *
 * @generated from rpc account.AdminService.CreateAccount
 */
export const createAccount = AdminService.method.createAccount;

/**
 * Updates account details, returns the account
 *
 * @generated from rpc account.AdminService.UpdateAccount
 */
export const updateAccount = AdminService.method.updateAccount;

/**
 * Get the details of a given account
 *
 * @generated from rpc account.AdminService.GetAccount
 */
export const getAccount = AdminService.method.getAccount;

/**
 * Completely deletes an account. This includes all of the data in that
 * account, bookmarks, changes etc. It also deletes all users from Auth0
 * that are associated with this account
 *
 * @generated from rpc account.AdminService.DeleteAccount
 */
export const deleteAccount = AdminService.method.deleteAccount;

/**
 * Lists all sources within the chosen account
 *
 * @generated from rpc account.AdminService.ListSources
 */
export const listSources = AdminService.method.listSources;

/**
 * Creates a new source within the chosen account
 *
 * @generated from rpc account.AdminService.CreateSource
 */
export const createSource = AdminService.method.createSource;

/**
 * Get the details of a source within the chosen account
 *
 * @generated from rpc account.AdminService.GetSource
 */
export const getSource = AdminService.method.getSource;

/**
 * Update the details of a source within the chosen account
 *
 * @generated from rpc account.AdminService.UpdateSource
 */
export const updateSource = AdminService.method.updateSource;

/**
 * Deletes a source from a chosen account
 *
 * @generated from rpc account.AdminService.DeleteSource
 */
export const deleteSource = AdminService.method.deleteSource;

/**
 * Updates sources to keep them running in the background. This can be used
 * to add explicit action, when the built-in keepalives are not sufficient.
 *
 * @generated from rpc account.AdminService.KeepaliveSources
 */
export const keepaliveSources = AdminService.method.keepaliveSources;

/**
 * Create a new NATS token for a given public NKey. The user requesting must
 * control the associated private key also in order to connect to NATS as
 * the token is not enough on its own
 *
 * @generated from rpc account.AdminService.CreateToken
 */
export const createToken = AdminService.method.createToken;
