import { Item, ItemAttributes, Reference } from '../items_pb';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";

function newProcess(): Item {
    const p = new Item();
    const pAttributes = new ItemAttributes();

    pAttributes.setAttrstruct(Struct.fromJavaScript({
        "pid": 12323,
        "state": "running",
        "cpuPercent": 99.99,
    }));

    p.setAttributes(pAttributes);
    p.setType("process");
    p.setContext("myPod");
    p.setUniqueattribute("pid");

    return p;
}

export const dylan = new Item();
export const katie = new Item();
export const process = newProcess();
const dylanAttributes = new ItemAttributes();
const katieAttributes = new ItemAttributes();
const dylanLink = new Reference();

// Create and set attributes
dylanAttributes.setAttrstruct(Struct.fromJavaScript({
    "name": "dylan",
    "age": 27,
}))

katieAttributes.setAttrstruct(Struct.fromJavaScript({
    "name": "katie",
    "age": 28,
}))

dylan.setAttributes(dylanAttributes)
katie.setAttributes(katieAttributes)

// Create a link between the two
dylanLink.setType("person");
dylanLink.setContext("global");
dylanLink.setUniqueattributevalue("katie");

dylan.addLinkeditems(dylanLink);

// Set generic "person attributes"
setPerson(dylan);
setPerson(katie);

export const items = [dylan, katie];

function setPerson(p: Item): void {
    p.setType("person");
    p.setUniqueattribute("name");
    p.setContext("global");
}
