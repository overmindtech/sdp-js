import { describe, expect, it } from '@jest/globals';
import { Util, Item, ItemAttributes, RequestMethod } from '../../';
import { ItemRequestError, ResponderState } from '../../responses_pb';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";
import { v4 as uuidv4, parse as uuidparse } from 'uuid';
import * as data from './sampledata';

describe("Util namespace", () => {
    describe('#newUUID', () => {
        it('throws no errors', () => {
            var u1 = Util.newUUID()
            var u2 = Util.newUUID()
            
            expect(u1).not.toEqual(u2);
        })
    })
    
    describe('#getUniqueattributevalue()', function() {
        it('should handle an item with a string UAV', function() {
            data.items.forEach((item: Item) => {
                var uav = Util.getUniqueattributevalue(item);
                
                expect(uav).not.toEqual("")
            });
        });
        
        it('should actually return the unadulterated string', function() {
            var uav = Util.getUniqueattributevalue(data.item.dylan);
            
            expect(uav).toEqual("dylan")
        });
        
        it('should actually return the unadulterated integer (as a string)', function() {
            var uav = Util.getUniqueattributevalue(data.item.process);
            
            expect(uav).toEqual("12323")
        });
    });
    
    describe('#getHash()', function() {
        it('should work for items', function() {
            var hash = Util.getHash(data.item.dylan);
            expect(hash).not.toEqual("");
        })
        
        it('should work for references', function() {
            var ref = Util.getReference(data.item.dylan);
            var hash = Util.getHash(ref);
            expect(hash).not.toEqual("");
        })
    });
    
    describe('#toDuration()', function() {
        it('should handle nice round numbers', () => {
            var d = Util.toDuration(1000);
            
            expect(d.getSeconds()).toEqual(1);
            expect(d.getNanos()).toEqual(0);
        })
        
        it('should handle less round numbers', () => {
            var d = Util.toDuration(5432);
            
            expect(d.getSeconds()).toEqual(5);
            expect(d.getNanos()).toEqual(432000000);
        })
    })
    
    describe('#getAttributeValue()', function() {
        var equalData = {
            "string": "foobar",
            "integer": 999,
            "boolean": true,
        };
        
        var equalAttrs = new ItemAttributes();
        equalAttrs.setAttrstruct(Struct.fromJavaScript(equalData));
        
        for (const [k, v] of Object.entries(equalData)) {
            it(`should handle ${k}`, function() {
                var actual = Util.getAttributeValue(equalAttrs, k)
                expect(actual).toEqual(v);
            });
        }
        
        var deepEqualData = {
            "array of integers": [1,2,3],
            "array of strings": ["one", "two", "three"],
            "mixed array": ["one", "two", 3],
        };
        
        var deepEqualAttrs = new ItemAttributes();
        deepEqualAttrs.setAttrstruct(Struct.fromJavaScript(deepEqualData));
        
        for (const [k, v] of Object.entries(deepEqualData)) {
            it(`should handle ${k}`, function() {
                expect(Util.getAttributeValue(deepEqualAttrs, k)).toEqual(v);
            });
        }
    });
    
    describe('#getAttributeValue()', function() {
        var equalData = {
            "string": "foobar",
            "integer": 999,
            "boolean": true,
        };
        
        var equalAttrs = new ItemAttributes();
        equalAttrs.setAttrstruct(Struct.fromJavaScript(equalData));
        
        for (const [k, v] of Object.entries(equalData)) {
            it(`should handle ${k}`, function() {
                var actual = Util.getAttributeValue(equalAttrs, k)
                expect(actual).toEqual(v);
            });
        }
        
        var deepEqualData = {
            "array of integers": [1,2,3],
            "array of strings": ["one", "two", "three"],
            "mixed array": ["one", "two", 3],
        };
        
        var deepEqualAttrs = new ItemAttributes();
        deepEqualAttrs.setAttrstruct(Struct.fromJavaScript(deepEqualData));
        
        for (const [k, v] of Object.entries(deepEqualData)) {
            it(`should handle ${k}`, function() {
                expect(Util.getAttributeValue(deepEqualAttrs, k)).toEqual(v);
            });
        }
    });
    
    describe('#newItemRequestError()', () => {
        var e = Util.newItemRequestError({
            context: "cont",
            errorString: "err",
            errorType: ItemRequestError.ErrorType.NOTFOUND,
        })
        
        expect(e.getContext()).toEqual("cont");
        expect(e.getErrorstring()).toEqual("err");
        expect(e.getErrortype()).toEqual(ItemRequestError.ErrorType.NOTFOUND);
    })
    
    describe('#newReference()', function() {
        const data = {
            type: "person",
            uniqueAttributeValue: "Sebastian",
            context: "global",
        }
        
        const ref = Util.newReference(data);
        
        it('should have the correct Type', () => {
            expect(ref.getType()).toEqual(data.type);
        })
        
        it('should have the correct Uniqueattributevalue', () => {
            expect(ref.getUniqueattributevalue()).toEqual(data.uniqueAttributeValue);
        })
        
        it('should have the correct Context', () => {
            expect(ref.getContext()).toEqual(data.context);
        })
    });
    
    describe('#newItemRequest()', function() {
        const data: Util.ItemRequestData = {
            type: "person",
            method: "GET",
            query: "Sebastian",
            linkDepth: 10,
            context: "global",
            itemSubject: "subject1",
            responseSubject: "subject3",
            errorSubject: "subject2",
            UUID: Uint8Array.from(uuidparse(uuidv4())),
            timeoutMs: 10000,
        }
        
        const ir = Util.newItemRequest(data);
        
        it('should have the correct Type', () => {
            expect(ir.getType()).toEqual(data.type);
        })
        
        it('should have the correct Method', () => {
            expect(ir.getMethod()).toEqual(RequestMethod.GET);
        })
        
        it('should have the correct Query', () => {
            expect(ir.getQuery()).toEqual(data.query);
        })
        
        it('should have the correct Linkdepth', () => {
            expect(ir.getLinkdepth()).toEqual(data.linkDepth);
        })
        
        it('should have the correct Context', () => {
            expect(ir.getContext()).toEqual(data.context);
        })
        
        it('should have the correct Itemsubject', () => {
            expect(ir.getItemsubject()).toEqual(data.itemSubject);
        })
        
        it('should have the correct Responsesubject', () => {
            expect(ir.getResponsesubject()).toEqual(data.responseSubject);
        })
        
    });
    
    describe('#newMetadata()', function() {
        const uuid = Uint8Array.from(uuidparse(uuidv4()))
        const data: Util.MetadataData = {
            sourceName: "packages",
            sourceRequest: {
                context: "sourceContext",
                itemSubject: "items",
                linkDepth: 0,
                method: 'FIND',
                query: "*",
                responseSubject: "response",
                errorSubject: "error",
                type: "package",
                UUID: uuid,
                timeoutMs: 10000,
            },
            timestamp: new Date(),
            sourceDuration: 1638,
            sourceDurationPerItem: 23,
        }
        
        const m = Util.newMetadata(data);
        
        it('should have the correct Backendname', () => {
            expect(m.getSourcename()).toEqual(data.sourceName)
        })
        
        it('should have the correct Requestmethod', () => {
            var sr = m.getSourcerequest();
            
            expect(sr).not.toBeUndefined
            
            if (typeof sr != 'undefined') {
                expect(sr.getContext()).toEqual("sourceContext");
                expect(sr.getItemsubject()).toEqual("items");
                expect(sr.getLinkdepth()).toEqual(0);
                expect(sr.getMethod()).toEqual(RequestMethod.FIND);
                expect(sr.getQuery()).toEqual("*");
                expect(sr.getResponsesubject()).toEqual("response");
                expect(sr.getType()).toEqual("package");
                expect(sr.getUuid()).toEqual(uuid)
                
                var timeout = sr.getTimeout()
                
                if (typeof timeout != 'undefined') {
                    expect(Util.toMs(timeout)).toEqual(10000)
                }
            }
        })
        
        it('should have the correct Timestamp', () => {
            const ts = m.getTimestamp();
            
            if (typeof ts != "undefined") {
                expect(Util.toDate(ts)).toEqual(data.timestamp)
            }
        })
        
        it('should have the correct sourceduration', () => {
            const duration = m.getSourceduration();
            
            if (typeof duration != "undefined") {
                const date = Util.toDate(duration);
                
                expect((date.getSeconds() * 1000) + date.getMilliseconds()).toEqual(data.sourceDuration);
            }
        })
        
        it('should have the correct sourcedurationperitem', () => {
            const duration = m.getSourcedurationperitem();
            
            if (typeof duration != "undefined") {
                const date = Util.toDate(duration);
                
                expect((date.getSeconds() * 1000) + date.getMilliseconds()).toEqual(data.sourceDurationPerItem);
            }
        })
    });
    
    
    describe('#newItem()', function() {
        const data: Util.ItemData = {
            type: "person",
            uniqueAttribute: "name",
            context: "global",
            attributes: Util.newItemAttributes({
                "name": "Dylan"
            }),
            metadata: undefined,
            linkedItemRequests: [],
            linkedItems: [],
        }
        
        const i = Util.newItem(data);
        
        it('should have the correct Type', () => {
            expect(i.getType()).toEqual(data.type)
        })
        
        it('should have the correct Uniqueattribute', () => {
            expect(i.getUniqueattribute()).toEqual(data.uniqueAttribute)
        })
        
        it('should have the correct Attributes', () => {
            expect(i.getAttributes()?.getAttrstruct()?.toJavaScript()["name"]).toEqual("Dylan");
        })
        
        it('should have the correct Metadata', () => {
            expect(i.getMetadata()).toEqual(data.metadata)
        })
        
        it('should have the correct Context', () => {
            expect(i.getContext()).toEqual(data.context)
        })
        
        it('should have the correct LinkeditemrequestsList', () => {
            expect(i.getLinkeditemrequestsList()).toEqual(data.linkedItemRequests)
        })
        
        it('should have the correct LinkeditemsList', () => {
            expect(i.getLinkeditemsList()).toEqual(data.linkedItems)
        })
        
    });
    
    describe('#newResponse()', function() {
        const data: Util.ResponseData = {
            responder: "test.context",
            state: ResponderState.ERROR,
            nextUpdateInMs: 0
        }
        
        const r = Util.newResponse(data);
        
        it('should have the correct Responder', () => {
            expect(r.getResponder()).toEqual("test.context")
        })
        
        it('should have the correct State', () => {
            expect(r.getState()).toEqual(ResponderState.ERROR)
        })
    });
    
    describe('#newCancelItemRequest()', function() {
        describe('with a string UUID', function() {
            const data: Util.CancelItemRequestData = {
                UUID: "bcee962c-ca60-479b-8a96-ab970d878392",
            }
            
            const c = Util.newCancelItemRequest(data);
            
            it('should have the correct UUID', () => {
                var expected = Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146])
                expect(c.getUuid()).toEqual(expected)
            })
        });
        
        describe('with a binary UUID', function() {
            const data: Util.CancelItemRequestData = {
                UUID: Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146]),
            }
            
            const c = Util.newCancelItemRequest(data);
            
            it('should have the correct UUID', () => {
                var expected = Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146])
                expect(c.getUuid()).toEqual(expected)
            })
        });
    });
    
    describe('#newGatewayRequest()', () => {
        describe('with an ItemRequestCancel', function() {
            const g = Util.newGatewayRequest({
                UUID: "bcee962c-ca60-479b-8a96-ab970d878392",
            }, 100)
            
            it('should be the correct type', () => {
                expect(g.hasCancel()).toEqual(true)
                expect(g.hasRequest()).toEqual(false)
            })
            
            it('should be the correct details', () => {
                var cancel = g.getCancel()
                var expected = Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146]);
                
                expect(cancel).not.toBeUndefined;
                expect(cancel?.getUuid_asU8()).toEqual(expected);
                expect(g.getMinstatusinterval()).toEqual(Util.toDuration(100));
                
            })
        })
        
        describe('with an ItemRequest', function() {
            var data: Util.ItemRequestData = {
                type: "person",
                method: "GET",
                query: "Sebastian",
                linkDepth: 10,
                context: "global",
                itemSubject: "subject1",
                errorSubject: "subject2",
                responseSubject: "subject3",
                UUID: Uint8Array.from(uuidparse(uuidv4())),
                timeoutMs: 10000,
            }
            
            const g = Util.newGatewayRequest(data, 100)
            
            it('should be the correct type', () => {
                expect(g.hasCancel()).toEqual(false)
                expect(g.hasRequest()).toEqual(true)
            })
            
            it('should be the correct details', () => {
                var req = g.getRequest();
                
                expect(req).not.toBeUndefined;
                
                if (typeof req != 'undefined') {
                    expect(req.getType()).toEqual(data.type);
                    expect(req.getMethod()).toEqual(RequestMethod.GET);
                    expect(req.getQuery()).toEqual(data.query);
                    expect(req.getLinkdepth()).toEqual(data.linkDepth);
                    expect(req.getContext()).toEqual(data.context);
                    expect(req.getItemsubject()).toEqual(data.itemSubject);
                    expect(req.getResponsesubject()).toEqual(data.responseSubject);
                }
            })
        })
    })
    
    describe('#newEdge()', function() {
        var e = Util.newEdge({
            from: {
                context: 'global',
                type: 'person',
                uniqueAttributeValue: 'dylan',
            },
            to: {
                context: 'global',
                type: 'person',
                uniqueAttributeValue: 'katelyn',
            }
        })
        
        it('should contain references', () => {
            expect(e.hasFrom()).toEqual(true);
            expect(e.hasTo()).toEqual(true);
            
            expect(e.getFrom()?.getContext()).toEqual('global');
            expect(e.getTo()?.getContext()).toEqual('global');
            expect(e.getFrom()?.getType()).toEqual('person');
            expect(e.getTo()?.getType()).toEqual('person');
            expect(e.getFrom()?.getUniqueattributevalue()).toEqual('dylan');
            expect(e.getTo()?.getUniqueattributevalue()).toEqual('katelyn');
        })
    })
    
    describe('#newGatewayRequestStatus()', function() {
        var states = new Map<string, ResponderState>();
        states.set("responder.cancel", ResponderState.CANCELLED);
        states.set("responder.complete", ResponderState.COMPLETE);
        states.set("responder.error", ResponderState.ERROR);
        states.set("responder.working", ResponderState.WORKING);
        
        var s = Util.newGatewayRequestStatus({
            summary: {
                cancelled: 1,
                complete: 1,
                error: 1,
                responders: 4,
                stalled: 1,
                working: 0,
            },
            postProcessingComplete: false,
            responderStates: states,
        })
        
        describe('summary', () => {
            it('should have the correct value for Cancelled', () => {
                expect(s.getSummary()?.getCancelled()).toEqual(1);
            })
            it('should have the correct value for Complete', () => {
                expect(s.getSummary()?.getComplete()).toEqual(1);
            })
            it('should have the correct value for Error', () => {
                expect(s.getSummary()?.getError()).toEqual(1);
            })
            it('should have the correct value for Responders', () => {
                expect(s.getSummary()?.getResponders()).toEqual(4);
            })
            it('should have the correct value for Stalled', () => {
                expect(s.getSummary()?.getStalled()).toEqual(1);
            })
            it('should have the correct value for Working', () => {
                expect(s.getSummary()?.getWorking()).toEqual(0);
            })
        })
        
        it('should have postProcessingComplete', () => {
            expect(s.getPostprocessingcomplete()).toEqual(false);
        })
        
        it('should have responders map with enough entries', () => {
            var finalResponders = s.getResponderstatesMap();
            
            expect(finalResponders.getLength()).toEqual(4);
            
            for (let [responder, state] of states) {
                expect(finalResponders.get(responder)).toEqual(state);
            }
        })
        
    })
    
    describe('#gatewayRequestStatusDone()', function() {
        var states = new Map<string, ResponderState>();
        states.set("responder.cancel", ResponderState.CANCELLED);
        states.set("responder.complete", ResponderState.COMPLETE);
        states.set("responder.error", ResponderState.ERROR);
        states.set("responder.working", ResponderState.WORKING);
        
        var s = Util.newGatewayRequestStatus({
            summary: {
                cancelled: 1,
                complete: 1,
                error: 1,
                responders: 4,
                stalled: 1,
                working: 0,
            },
            postProcessingComplete: false,
            responderStates: states,
        })
        
        it('handles when people are still responding', () => {
            expect(Util.gatewayRequestStatusDone(s)).toEqual(false);
        })
        
        it('handles when all responders are complete but post-processing isnt', () => {
            s.getSummary()?.setWorking(0);
            s.getSummary()?.setComplete(2);
            expect(Util.gatewayRequestStatusDone(s)).toEqual(false);
        })
        
        it('handles when all responders are complete and so is prost-processing', () => {
            s.setPostprocessingcomplete(true);
            expect(Util.gatewayRequestStatusDone(s)).toEqual(true);
        })
        
        it('handles when post processing is complete and workers arent', () => {
            s.getSummary()?.setWorking(1);
            expect(Util.gatewayRequestStatusDone(s)).toEqual(false);
        })
    })
    
    describe('#newGatewayResponse()', () => {
        describe('with ItemData', () => {
            const data: Util.ItemData = {
                type: "person",
                uniqueAttribute: "name",
                context: "global",
                attributes: Util.newItemAttributes({
                    "name": "Dylan"
                }),
                metadata: undefined,
                linkedItemRequests: [],
                linkedItems: [],
            }
            
            it('should return the correct type', () => {
                const resp = Util.newGatewayResponse(data);
                expect(resp.hasNewitem()).toEqual(true);
            })
        })
        describe('with EdgeData', () => {
            const data = {
                from: {
                    context: 'global',
                    type: 'person',
                    uniqueAttributeValue: 'dylan',
                },
                to: {
                    context: 'global',
                    type: 'person',
                    uniqueAttributeValue: 'katelyn',
                }
            }
            
            it('should return the correct type', () => {
                const resp = Util.newGatewayResponse(data);
                expect(resp.hasNewedge()).toEqual(true);
            })
        })
        describe('with ItemRequestErrorData', () => {
            const data = {
                context: "cont",
                errorString: "err",
                errorType: ItemRequestError.ErrorType.NOTFOUND,
            }
            
            it('should return the correct type', () => {
                const resp = Util.newGatewayResponse(data);
                expect(resp.hasNewitemrequesterror()).toEqual(true);
            })
        })
        describe('with GatewayRequestStatusData', () => {
            var states = new Map<string, ResponderState>();
            states.set("responder.cancel", ResponderState.CANCELLED);
            states.set("responder.complete", ResponderState.COMPLETE);
            states.set("responder.error", ResponderState.ERROR);
            states.set("responder.working", ResponderState.WORKING);
            
            const data = {
                summary: {
                    cancelled: 1,
                    complete: 1,
                    error: 1,
                    responders: 4,
                    stalled: 1,
                    working: 0,
                },
                postProcessingComplete: false,
                responderStates: states,
            }
            
            it('should return the correct type', () => {
                const resp = Util.newGatewayResponse(data);
                expect(resp.hasStatus()).toEqual(true);
            })
        })
        describe('with string', () => {
            const data = "foo"
            
            it('should return the correct type', () => {
                const resp = Util.newGatewayResponse(data);
                expect(resp.hasError()).toEqual(true);
            })
        })
    })
})