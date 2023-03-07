import { CustomEventListenerOrEventListenerObject, GatewaySession } from './GatewaySession'
import { parse, stringify as uuidStringify, v4 as uuidv4 } from 'uuid'
import {
  CancelQuery,
  GatewayRequest,
  Item,
  Query,
  RequestMethod,
} from './__generated__/'
import { newDuration, getAttributeValue, getUniqueAttributeValue } from './Util'

/**
 * Result that combines the actual result with the score
 */
type AutocompleteResult = {
  value: string
  score: number
}

/**
 * Stores the history of prompts and related results
 */
type PromptHistory = {
  [key: string]: AutocompleteResult[]
}

export enum AutocompleteField {
  TYPE = 0,
  SCOPE = 1,
}

/**
 * This event is fired when new suggestions are found
 */
export const NewSuggestionsEvent = 'new-suggestions'

/**
 * I'm not really sure what the API should look like for autocomplete, as in how
 * the data should come in and out. I'm going to take a stab but once we know
 * how it'll be consumed by the front end we should change it to be more
 * appropriate
 */
export class Autocomplete extends EventTarget {
  field: AutocompleteField

  private _prompt = ''
  private session: GatewaySession
  private currentRequestUUID: Uint8Array = new Uint8Array()
  private history: PromptHistory = {}

  /**
   *
   * @param session The gateway session that requests should be sent on
   */
  constructor(session: GatewaySession, field: AutocompleteField) {
    super()
  
    if (session.state() !== WebSocket.OPEN) {
      // We are failing here because I can't find a good spot in this API
      // to put an async method. If we review this later we might want to
      // remove this requirement and just have the object be smart enough
      // to wait until the session is ready before sending anything
      throw new Error('session must be OPEN for autocomplete')
    }

    this.session = session
    this.field = field

    // Listen for results
    this.session.addEventListener('new-item', (item) =>
      this.processItem(item.detail)
    )
  }

  addEventListener(
    type: typeof NewSuggestionsEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    super.addEventListener(type, callback, options)
  }

  removeEventListener(
    type: typeof NewSuggestionsEvent,
    callback: CustomEventListenerOrEventListenerObject<string[]> | null,
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    super.removeEventListener(type, callback, options)
  }


  /**
   * Searches for results for a given prompt
   */
  setPrompt(prompt: string) {
    this._prompt = prompt

    if (!this.history[this._prompt]) {
      this.history[this._prompt] = []
    }

    if (this.currentRequestUUID.length !== 0) {
      // Cancel any running requests
      this.session.sendRequest(
        new GatewayRequest({
          minStatusInterval: newDuration(1000),
          requestType: {
            case: 'cancelQuery',
            value: new CancelQuery({
              UUID: this.currentRequestUUID,
            }),
          },
        })
      )
    }

    const uuid = parse(uuidv4())

    let type: string

    switch (this.field) {
      case AutocompleteField.SCOPE:
        type = 'overmind-scope'
        break
      case AutocompleteField.TYPE:
        type = 'overmind-type'
        break
    }

    // Create a new request
    const request = new GatewayRequest({
      minStatusInterval: newDuration(500),
      requestType: {
        case: 'query',
        value: new Query({
          scope: 'global',
          linkDepth: 0,
          type: type,
          method: RequestMethod.SEARCH,
          query: prompt,
          UUID: uuid,
          timeout: newDuration(2000),
        }),
      },
    })

    // Set the UUID so we know which responses to use and which to ignore
    this.currentRequestUUID = uuid

    // Start the request
    this.session.sendRequest(request)

    // If we have any cached results, return them
    if (this.history[prompt].length > 0) {
      this.sendUpdate()
    }
  }

  /**
   * Processes incoming items and extracts autocomplete responses
   *
   * @param item The item to process
   */
  processItem(item: Item): void {
    const itemUUID = item.metadata?.sourceQuery?.UUID

    if (typeof itemUUID !== 'undefined') {
      if (uuidStringify(itemUUID) == uuidStringify(this.currentRequestUUID)) {
        let score = 0

        if (item.attributes !== undefined) {
          const attributeScore = getAttributeValue(item.attributes, 'score')
          if (typeof attributeScore === 'number') {
            score = attributeScore
          }
        }

        // Add the result
        this.history[this._prompt].push({
          value: getUniqueAttributeValue(item),
          score: score,
        })

        // Re-sort
        this.history[this._prompt].sort((a, b) => a.score - b.score)

        // Dispatch an event
        this.sendUpdate()
      }
    }
  }

  /**
   * Sends an updated list of suggestions based on the current prompt and
   * history
   */
  private sendUpdate() {
    this.dispatchEvent(
      new CustomEvent<string[]>(NewSuggestionsEvent, {
        detail: this.history[this._prompt].map((res) => res.value),
      })
    )
  }
}
