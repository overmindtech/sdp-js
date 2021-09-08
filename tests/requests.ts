import { ItemRequest, RequestMethod } from "../items_pb";

// Example FIND request
const FIND = new ItemRequest();
FIND.setType("package");
FIND.setMethod(RequestMethod.FIND);
FIND.setLinkdepth(90);
FIND.setContext("test.context");
FIND.setItemsubject("itemSubject");
FIND.setResponsesubject("responseSubject");

export {
    FIND
}