import {
  CustomEventListenerOrEventListenerObject,
  GatewaySession,
} from './GatewaySession'
import { GatewayRequest, Item, Query, QueryMethod } from './generated'
import { v4, parse } from 'uuid'
import { getUniqueAttributeValue, newDuration } from './Util'

export enum DiscoveryField {
  TYPE = 0,
  SCOPE = 1,
}

function toString(field: DiscoveryField): string {
  switch (field) {
    case DiscoveryField.TYPE:
      return 'overmind-type'
    case DiscoveryField.SCOPE:
      return 'overmind-scope'
    default:
      return ''
  }
}

export const NewTypeEvent = 'new-type'
export const NewScopeEvent = 'new-scope'

export class SourceDiscovery extends EventTarget {
  private session: GatewaySession
  private types: string[] = []
  private scopes: string[] = []

  constructor(session: GatewaySession) {
    super()

    this.session = session

    // Listen for results
    this.session.addEventListener('new-item', (item) =>
      this.processItem(item.detail)
    )
  }

  addEventListener(
    type: typeof NewTypeEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: typeof NewScopeEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: AddEventListenerOptions | boolean
  ): void {
    super.addEventListener(type, callback, options)
  }

  removeEventListener(
    type: typeof NewTypeEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: typeof NewScopeEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void
  removeEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions | undefined
  ): void {
    super.removeEventListener(type, callback, options)
  }

  /**
   * Starts discovering available types. Results will be dispatched as a
   * NewTypeEvent
   */
  discoverTypes() {
    this.discover('overmind-type')
  }

  /**
   * Starts discovering available scopes. Results will be dispatched as a
   * NewTypeEvent
   */
  discoverScopes() {
    this.discover('overmind-scope')
  }

  discoverField(field: DiscoveryField) {
    this.discover(toString(field))
  }

  private discover(type: string) {
    const request = new GatewayRequest({
      requestType: {
        case: 'query',
        value: new Query({
          scope: 'global',
          method: QueryMethod.LIST,
          timeout: newDuration(5000),
          UUID: parse(v4()),
          type: type,
        }),
      },
    })

    this.session.sendRequest(request)
  }

  /**
   * Processes incoming items and extracts autocomplete responses
   *
   * @param item The item to process
   */
  processItem(item: Item): void {
    switch (item.type) {
      case 'overmind-scope':
        // Add the suggestion to the list
        this.scopes.push(getUniqueAttributeValue(item))
        this.scopes.sort()

        // Dispatch an event
        this.dispatchEvent(
          new CustomEvent<string[]>(NewScopeEvent, {
            detail: this.scopes,
          })
        )
        break
      case 'overmind-type':
        // Add the suggestion to the list
        this.types.push(getUniqueAttributeValue(item))
        this.types.sort()

        // Dispatch an event
        this.dispatchEvent(
          new CustomEvent<string[]>(NewTypeEvent, {
            detail: this.types,
          })
        )
        break
      default:
        break
    }
  }
}
