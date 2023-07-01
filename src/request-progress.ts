import { Query, ResponderState, Response } from './protobuf'
import { Responder } from './responder'

export class RequestProgress {
  responders: Map<string, Responder> = new Map<string, Responder>()
  request: Query

  // This is the result of a setInterval which watches for timeouts and sets
  // nodes as stalled
  private watcher: NodeJS.Timeout

  // Tracks the number of things currently being processed so that we can be
  // sure that all processing is complete before returning
  private inFlight = 0

  /**
   *
   * @param request The request for which to track progress
   * @param stallCheckIntervalMs How often to check to see if responders have
   * stalled, in milliseconds
   */
  constructor(request: Query, stallCheckIntervalMs = 500) {
    this.request = request

    // Start watching for stalls
    this.watcher = setInterval(() => {
      // Check to see if the request is complete, if it is we need to stop
      // checking
      if (this.allDone()) {
        clearInterval(this.watcher)
      }

      // Get the current time
      const now = new Date()

      // Loop over all results and check for stalls
      for (const responder of this.responders) {
        if (
          responder[1].nextStateTime !== undefined &&
          responder[1].nextStateTime < now
        ) {
          // This means that the responder has stalled
          responder[1].state = ResponderState.STALLED
        }
      }
    }, stallCheckIntervalMs)
  }

  // Return the count of items with a given state
  private countOfState(state: ResponderState): number {
    let x = 0

    for (const v of this.responders) {
      if (v[1].state === state) {
        x++
      }
    }

    return x
  }

  /**
   * Cancels loops that are watching for stalls
   */
  cancel(): void {
    clearInterval(this.watcher)
  }

  /**
   *
   * @returns The number of responder still working
   */
  numWorking(): number {
    return this.countOfState(ResponderState.WORKING)
  }

  /**
   *
   * @returns The number of stalled responders
   */
  numStalled(): number {
    return this.countOfState(ResponderState.STALLED)
  }

  /**
   *
   * @returns The number of complete responders
   */
  numComplete(): number {
    return this.countOfState(ResponderState.COMPLETE)
  }

  /**
   *
   * @returns The number of failed responders
   */
  numFailed(): number {
    return this.countOfState(ResponderState.ERROR)
  }

  /**
   *
   * @returns The number of cancelled responders
   */
  numCancelled(): number {
    return this.countOfState(ResponderState.CANCELLED)
  }

  /**
   *
   * @returns The total number of responders for the query
   */
  numResponders(): number {
    return this.responders.size
  }

  /**
   *
   * @returns True if all responders are done or stalled
   */
  allDone(): boolean {
    if (this.numResponders() > 0 && this.inFlight === 0) {
      return this.numWorking() === 0
    }

    return false
  }

  /**
   * Returns a number between 1 and 100 representing the percentage complete
   * of all responders.
   * @returns The percentage of complete responders
   */
  percentComplete(): number {
    return (this.numComplete() / this.numResponders()) * 100
  }

  /**
   * Waits for all to be completed, then returns
   * @param timeoutMs How long to wait before timing out
   * @returns "timeout" or "done"
   */
  waitForCompletion(timeoutMs = 3000): Promise<string> {
    // How often to check for done-ness
    const doneCheckIntervalMs = 100
    let doneChecker: number

    // Create the timeout promise
    const timeout = new Promise<string>((resolve) =>
      setTimeout(resolve, timeoutMs, 'timeout')
    )

    // Create the done promise
    return new Promise<string>((resolve) => {
      doneChecker = setInterval(
        () => {
          if (this.allDone()) {
            clearInterval(doneChecker)
            resolve('done')
          }
        },
        doneCheckIntervalMs,
        resolve
      )

      timeout.then(() => {
        clearInterval(doneChecker)
        resolve('timeout')
      })
    })
  }

  /**
   * Processes a response and updates tracking of responders.
   * @param response The response to process
   */
  processResponse(response: Response): void {
    this.inFlight++

    // Pull details out of the response
    const responderName = response.responder
    let nextUpdateTime: Date | undefined

    // Get the responder or create a new one
    const responder =
      this.responders.get(responderName) || new Responder(responderName)

    // If there is a next update time the calculate it
    const nextUpdateIn = response.nextUpdateIn
    if (nextUpdateIn !== undefined) {
      let nextUpdateMilliseconds = 0

      // Convert nanoseconds to milliseconds
      nextUpdateMilliseconds = nextUpdateIn.nanos / 1_000_000

      // Convert seconds to milliseconds and add
      nextUpdateMilliseconds =
        nextUpdateMilliseconds + Number(nextUpdateIn.seconds) * 1000

      // Create a new date object representing the date that the update is
      // expected by
      const now = new Date()
      nextUpdateTime = new Date(now.getTime() + nextUpdateMilliseconds)
    }

    // Set properties from the response
    responder.state = response.state
    responder.nextStateTime = nextUpdateTime

    // Save the value
    this.responders.set(responderName, responder)

    this.inFlight--
  }
}
