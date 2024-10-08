/**
 * An error event is sent when the gateway itself encounters an error when
 * running the request. An error here means that the request wasn't started
 */
export const ErrorEvent = 'error'

/**
 * This event is sent when a new item is discovered as a result of the
 * queries that have been started during the session
 */
export const NewItemEvent = 'new-item'

/**
 * This event is sent when a new edge between two items is discovered. Note
 * that edges will only be sent after both items have been sent, so an edge
 * should never refer to a non-existent item
 */
export const NewEdgeEvent = 'new-edge'

/**
 * This event means that the client should delete an item from its local data
 * store. This is probably due to an "undo" or "delete" request by the user
 */
export const DeleteItemEvent = 'delete-item'

/**
 * This event structs the client to delete a give edge. It will be sent along
 * with a `DeleteItemEvent` when an item is delete if it also requires any edges
 * be deleted
 */
export const DeleteEdgeEvent = 'delete-edge'

/**
 * This event means that a newer version of an item is available and the
 * existing version should be replaced with this one
 */
export const UpdateItemEvent = 'update-item'

/**
 * This event is fired when receiving a BookmarkStoreResult
 */
export const BookmarkStoreResultEvent = 'bookmark-store-result'

/**
 * This event is fired when receiving a BookmarkLoadResult
 */
export const BookmarkLoadResultEvent = 'bookmark-load-result'

/**
 * This event is fired when receiving a SnapshotStoreResult
 */
export const SnapshotStoreResultEvent = 'snapshot-store-result'

/**
 * This event is fired when receiving a SnapshotLoadResult
 */
export const SnapshotLoadResultEvent = 'snapshot-load-result'

/**
 * This event informs the client of status updates of all queries running in this session.
 */
export const QueryStatusEvent = 'query-status'

/**
 * This event informs the client of chat message response
 */
export const ChatResponseEvent = 'chat-response'

/**
 * This event informs the client of chat message tool start
 */
export const ChatResponseToolStartEvent = 'chat-response-tool-start'

/**
 * This event informs the client of chat message tool call
 */
export const ChatResponseToolFinishEvent = 'chat-response-tool-finish'

/**
 * This event means that an error was encountered by one of the responders
 * when responding to the request. This could indicate a failure, or might
 * be expected. It s up to the user to determine how these errors should be
 * surfaced and handled
 */
export const QueryErrorEvent = 'query-error'

/**
 * Status events are sent at an interval determined in the `GatewayRequest`,
 * subsequent gateway requests will update the interval. If the status has
 * not changed since the last interval elapsed, nothing will be sent
 */
export const StatusEvent = 'status'

/**
 * Socket errors are errors surfaced from the underlying websocket
 * connection itself and usually mean there has been some network-level
 * issue
 */
export const SocketErrorEvent = 'socket-error'

/**
 * Closed events are sent when a connection is closed
 */
export const CloseEvent = 'close'
