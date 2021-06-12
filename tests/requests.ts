import { ItemRequest, RequestMethod } from "../dist/items_pb";

// Example FIND request
const FIND = new ItemRequest();
FIND.setType("package");
FIND.setMethod(RequestMethod.FIND);
FIND.setLinkdepth(90);
FIND.setContext("test.context");
FIND.setItemsubject("itemSubject");
FIND.setLinkeditemsubject("linkedItemSubject");
FIND.setResponsesubject("responseSubject");
FIND.setErrorsubject("errorSubject");

export {
    FIND
}