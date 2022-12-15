/**
 * An error event is sent when the gateway itself encounters an error when
 * running the request. An error here means that the request wasn't started
 */
export const ErrorEvent = 'error'

/**
 * Ths event is sent when a new item is discovered as a result of the
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
 * This event means that an error was encountered by one of the responders
 * when responding to the request. This could indicate a failure, or might
 * be expected. It s up to the user to determine how these errors should be
 * surfaced and handled
 */
export const NewItemRequestErrorEvent = 'item-request-error'

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
