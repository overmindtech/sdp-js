import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import { ResponderState, Response } from "../responses_pb";
import { ItemRequestError } from "../responses_pb";
import { Util } from '../index'

// Create errors
const NOTFOUND = new ItemRequestError();
NOTFOUND.setContext("test.context");
NOTFOUND.setErrortype(ItemRequestError.ErrorType.NOTFOUND)
NOTFOUND.setErrorstring("Could not be found")

const NOCONTEXT = new ItemRequestError();
NOCONTEXT.setContext("test.context");
NOCONTEXT.setErrortype(ItemRequestError.ErrorType.NOCONTEXT)
NOCONTEXT.setErrorstring("Context does not exist")

const OTHER = new ItemRequestError();
OTHER.setContext("test.context");
OTHER.setErrortype(ItemRequestError.ErrorType.OTHER)
OTHER.setErrorstring("Unknown error")


const WORKING = Util.newResponse({
    responder: "test.context",
    state: ResponderState.WORKING,
    nextUpdateInMs: 100
})

const COMPLETE = Util.newResponse({
    responder: "test.context",
    state: ResponderState.COMPLETE,
    nextUpdateInMs: 100,
})

const CANCELLED = Util.newResponse({
    responder: "test.context",
    state: ResponderState.CANCELLED,
})

const NOTFOUNDERROR = Util.newResponse({
    responder: "test.context",
    state: ResponderState.ERROR,
    error: NOTFOUND,
})

const NOCONTEXTERROR = Util.newResponse({
    responder: "test.context",
    state: ResponderState.ERROR,
    error: NOCONTEXT,
})

const OTHERERROR = Util.newResponse({
    responder: "test.context",
    state: ResponderState.ERROR,
    error: OTHER,
})

export {
    WORKING,
    COMPLETE,
    NOTFOUNDERROR,
    NOCONTEXTERROR,
    OTHERERROR,
    NOCONTEXT,
    CANCELLED
}