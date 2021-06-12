import { Duration } from "google-protobuf/google/protobuf/duration_pb";
import { Response } from "../dist/responses_pb";

// One tenth of a second (100ms)
const ONE_TENTH = new Duration();
ONE_TENTH.setNanos(100000000);
ONE_TENTH.setSeconds(0);

const WORKING = new Response();
WORKING.setContext("test.context");
WORKING.setState(Response.ResponseState.WORKING);
WORKING.setNextupdatein(ONE_TENTH);

export {
    WORKING
}