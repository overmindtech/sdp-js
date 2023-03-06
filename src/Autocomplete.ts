import { GatewaySession } from './GatewaySession'
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

export enum AutocompleteField {
  TYPE = 0,
  CONTEXT = 1,
}

/**
 * I'm not really sure what the API should look like for autocomplete, as in how
 * the data should come in and out. I'm going to take a stab but once we know
 * how it'll be consumed by the front end we should change it to be more
 * appropriate
 */
export class Autocomplete {
  field: AutocompleteField
  results: AutocompleteResult[] = []

  private _prompt = ''
  private session: GatewaySession
  private currentRequestUUID: Uint8Array = new Uint8Array()

  /**
   *
   * @param session The gateway session that requests should be sent on
   */
  constructor(session: GatewaySession, field: AutocompleteField) {
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

  /**
   * The suggested type values for the provided typePrompt
   */
  get suggestions(): string[] {
    return this.results.map((result) => result.value)
  }

  /**
   * The prompt to search for
   */
  get prompt(): string {
    return this._prompt
  }

  /**
   * The prompt to search for
   */
  set prompt(prompt: string) {
    this._prompt = prompt

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

    // Delete current autocomplete options
    this.results = []

    const uuid = parse(uuidv4())

    let type: string

    switch (this.field) {
      case AutocompleteField.CONTEXT:
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
        this.results.push({
          value: getUniqueAttributeValue(item),
          score: score,
        })

        // Re-sort
        this.results.sort((a, b) => a.score - b.score)
      }
    }
  }
}
