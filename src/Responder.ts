import { ItemRequestError, ResponderState } from "./__generated__/responses_pb";

/**
 * Represents something that is responding to our query
 */
export class Responder {
  name = "";
  lastStateTime: Date = new Date();
  nextStateTime: Date | undefined;
  error?: ItemRequestError;
  private _lastState: ResponderState = ResponderState.WORKING;

  /**
   *
   * @param responder The responder that this responder will respond for
   */
  constructor(name: string) {
    this.name = name;
    this.state = ResponderState.WORKING;
  }

  // Sets the state and updates the LastState to the current time
  set state(state: ResponderState) {
    // Set last state time to now
    this.lastStateTime = new Date();

    this._lastState = state;
  }

  // Get the last state of this responder
  get state(): ResponderState {
    return this._lastState;
  }
}
