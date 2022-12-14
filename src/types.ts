import {
  ItemAttributes,
  Metadata,
  ItemRequest,
  Reference,
} from './__generated__/items_pb'
import { ItemRequestError, ResponderState } from './__generated__/responses_pb'

export type EdgeData = {
  from: ReferenceData
  to: ReferenceData
}

export type ReferenceData = {
  type: string
  uniqueAttributeValue: string
  scope: string
}

export type ItemData = {
  type: string
  uniqueAttribute: string
  scope: string
  attributes: ItemAttributes
  metadata: Metadata | undefined
  linkedItemRequests: ItemRequest[]
  linkedItems: Reference[]
}

export type GatewayRequestStatusData = {
  responderStates: Map<string, ResponderState>
  summary: {
    working: number
    stalled: number
    complete: number
    error: number
    cancelled: number
    responders: number
  }
  postProcessingComplete: boolean
}

export type ItemRequestErrorData = {
  scope: string
  errorString: string
  errorType: ItemRequestError.ErrorType
}
