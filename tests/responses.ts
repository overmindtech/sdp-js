import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import { Response } from "../responses_pb";

// One tenth of a second (100ms)
const ONE_TENTH = new Duration();
ONE_TENTH.setNanos(100000000);
ONE_TENTH.setSeconds(0);

const WORKING = new Response();
WORKING.setContext("test.context");
WORKING.setState(Response.ResponseState.WORKING);
WORKING.setNextupdatein(ONE_TENTH);

const COMPLETE = new Response();
COMPLETE.setContext("test.context");
COMPLETE.setState(Response.ResponseState.COMPLETE);
COMPLETE.setNextupdatein(ONE_TENTH);

export {
    WORKING,
    COMPLETE
}