import { Item, ItemAttributes, Reference, Util } from '..';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";

export const process = Util.newItem({
    type: "process",
    context: "myPod",
    uniqueAttribute: "pid",
    attributes: Util.newItemAttributes({
        "pid": 12323,
        "state": "running",
        "cpuPercent": 99.99,
    }),
    linkedItemRequests: [],
    linkedItems: [],
    metadata: undefined,
});

export const dylan = Util.newItem({
    context: "global",
    uniqueAttribute: "name",
    type: "person",
    attributes: Util.newItemAttributes({
        "name": "dylan",
        "age": 27,    
    }),
    linkedItemRequests: [],
    linkedItems: [
        Util.newReference({
            context: "global",
            type: "person",
            uniqueAttributeValue: "katie",
        }),
    ],
    metadata: undefined,
});

export const katie = Util.newItem({
    context: "global",
    uniqueAttribute: "name",
    type: "person",
    attributes: Util.newItemAttributes({
        "name": "katie",
        "age": 28,
        }),
    linkedItemRequests: [],
    linkedItems: [],
    metadata: undefined,
});

export const items = [dylan, katie];


