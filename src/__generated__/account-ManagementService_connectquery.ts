// @generated by protoc-gen-connect-query v2.0.0 with parameter "target=ts"
// @generated from file account.proto (package account, syntax proto3)
/* eslint-disable */

import { ManagementService } from "./account_pb";

/**
 * Get the details of the account that this user belongs to
 *
 * @generated from rpc account.ManagementService.GetAccount
 */
export const getAccount = ManagementService.method.getAccount;

/**
 * Completely deletes the user's account. This includes all of the data in
 * that account, bookmarks, changes etc. It also deletes the current user,
 * and all other users in that account from Auth0
 *
 * @generated from rpc account.ManagementService.DeleteAccount
 */
export const deleteAccount = ManagementService.method.deleteAccount;

/**
 * Lists all sources within the user's account
 *
 * @generated from rpc account.ManagementService.ListSources
 */
export const listSources = ManagementService.method.listSources;

/**
 * Creates a new source within the user's account
 *
 * @generated from rpc account.ManagementService.CreateSource
 */
export const createSource = ManagementService.method.createSource;

/**
 * Get the details of a source
 *
 * @generated from rpc account.ManagementService.GetSource
 */
export const getSource = ManagementService.method.getSource;

/**
 * Update the details of a source
 *
 * @generated from rpc account.ManagementService.UpdateSource
 */
export const updateSource = ManagementService.method.updateSource;

/**
 * Deletes a source from a user's account
 *
 * @generated from rpc account.ManagementService.DeleteSource
 */
export const deleteSource = ManagementService.method.deleteSource;

/**
 * Sources heartbeat and health
 * List of all recently active sources and their health, includes information from srcman
 * meaning that it can show the status of managed sources that have not started and
 * connected yet
 *
 * @generated from rpc account.ManagementService.ListAllSourcesStatus
 */
export const listAllSourcesStatus = ManagementService.method.listAllSourcesStatus;

/**
 * Lists all active sources and their health. This should be used to determine
 * what types, scopes etc are available rather than `ListAllSourcesStatus` since
 * this endpoint only include running, available sources
 *
 * @generated from rpc account.ManagementService.ListActiveSourcesStatus
 */
export const listActiveSourcesStatus = ManagementService.method.listActiveSourcesStatus;

/**
 * Heartbeat from a source to keep it registered and healthy
 *
 * @generated from rpc account.ManagementService.SubmitSourceHeartbeat
 */
export const submitSourceHeartbeat = ManagementService.method.submitSourceHeartbeat;

/**
 * Updates sources to keep them running in the background. This can be used
 * to add explicit action, when the built-in keepalives are not sufficient.
 *
 * @generated from rpc account.ManagementService.KeepaliveSources
 */
export const keepaliveSources = ManagementService.method.keepaliveSources;

/**
 * Create a new NATS token for a given public NKey. The user requesting must
 * control the associated private key also in order to connect to NATS as
 * the token is not enough on its own
 *
 * @generated from rpc account.ManagementService.CreateToken
 */
export const createToken = ManagementService.method.createToken;

/**
 * @generated from rpc account.ManagementService.GetTrialEnd
 */
export const getTrialEnd = ManagementService.method.getTrialEnd;

/**
 * Lists all the available item types that can be discovered by sources that are running and healthy
 *
 * @generated from rpc account.ManagementService.ListAvailableItemTypes
 */
export const listAvailableItemTypes = ManagementService.method.listAvailableItemTypes;
