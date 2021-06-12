import { ItemRequestError } from "../errors_pb";

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

export {
    NOTFOUND,
    NOCONTEXT,
    OTHER
}