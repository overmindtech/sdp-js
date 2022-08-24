import { Util, Item, ItemAttributes, RequestMethod } from '..';
import * as testData from './items';
import * as assert from 'assert';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";
import { ItemRequestError, ResponderState } from '../responses_pb';
import { v4 as uuidv4, parse as uuidparse } from 'uuid';
import { ResponderStateMap } from '../responses_pb';
import { AssertionError } from 'chai';


describe('Util', function() {
  describe('#newUUID', function() {
    // Does not throw any errors
    var u1 = Util.newUUID()
    var u2 = Util.newUUID()
    
    assert.notStrictEqual(u1, u2);
  })
  describe('#getUniqueattributevalue()', function() {
    it('should handle an item with a string UAV', function() {
      testData.items.forEach((item: Item) => {
        var uav = Util.getUniqueattributevalue(item);
        
        assert.notStrictEqual(uav, "")
      });
    });
    
    it('should actually return the unadulterated string', function() {
      var uav = Util.getUniqueattributevalue(testData.dylan);
      
      assert.strictEqual(uav, "dylan")
    });
    
    it('should actually return the unadulterated integer (as a string)', function() {
      var uav = Util.getUniqueattributevalue(testData.process);
      
      assert.strictEqual(uav, "12323")
    });
    
    
  });
  describe('#getHash()', function() {
    it('should work for items', function() {
      var hash = Util.getHash(testData.dylan);
      assert.notStrictEqual(hash, "");
    })
    
    it('should work for references', function() {
      var ref = Util.getReference(testData.dylan);
      var hash = Util.getHash(ref);
      assert.notStrictEqual(hash, "");
    })
  });
  
  describe('#toDuration()', function() {
    it('should handle nice round numbers', () => {
      var d = Util.toDuration(1000);
      
      assert.strictEqual(d.getSeconds(), 1);
      assert.strictEqual(d.getNanos(), 0);
    })
    
    it('should handle less round numbers', () => {
      var d = Util.toDuration(5432);
      
      assert.strictEqual(d.getSeconds(), 5);
      assert.strictEqual(d.getNanos(), 432000000);
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
        assert.strictEqual(actual, v);
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
        assert.deepStrictEqual(Util.getAttributeValue(deepEqualAttrs, k), v);
      });
    }
  });
  
  describe('#newItemRequestError()', () => {
    var e = Util.newItemRequestError({
      context: "cont",
      errorString: "err",
      errorType: ItemRequestError.ErrorType.NOTFOUND,
    })
    
    assert.strictEqual(e.getContext(), "cont");
    assert.strictEqual(e.getErrorstring(), "err");
    assert.strictEqual(e.getErrortype(), ItemRequestError.ErrorType.NOTFOUND);
  })
  
  describe('#newReference()', function() {
    const data = {
      type: "person",
      uniqueAttributeValue: "Sebastian",
      context: "global",
    }
    
    const ref = Util.newReference(data);
    
    it('should have the correct Type', () => {
      assert.strictEqual(ref.getType(), data.type);
    })
    
    it('should have the correct Uniqueattributevalue', () => {
      assert.strictEqual(ref.getUniqueattributevalue(), data.uniqueAttributeValue);
    })
    
    it('should have the correct Context', () => {
      assert.strictEqual(ref.getContext(), data.context);
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
      assert.strictEqual(ir.getType(), data.type);
    })
    
    it('should have the correct Method', () => {
      assert.strictEqual(ir.getMethod(), RequestMethod.GET);
    })
    
    it('should have the correct Query', () => {
      assert.strictEqual(ir.getQuery(), data.query);
    })
    
    it('should have the correct Linkdepth', () => {
      assert.strictEqual(ir.getLinkdepth(), data.linkDepth);
    })
    
    it('should have the correct Context', () => {
      assert.strictEqual(ir.getContext(), data.context);
    })
    
    it('should have the correct Itemsubject', () => {
      assert.strictEqual(ir.getItemsubject(), data.itemSubject);
    })
    
    it('should have the correct Responsesubject', () => {
      assert.strictEqual(ir.getResponsesubject(), data.responseSubject);
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
      assert.strictEqual(m.getSourcename(), data.sourceName)
    })
    
    it('should have the correct Requestmethod', () => {
      var sr = m.getSourcerequest();
      
      if (typeof sr != 'undefined') {
        assert.strictEqual(sr.getContext(),"sourceContext");
        assert.strictEqual(sr.getItemsubject(),"items");
        assert.strictEqual(sr.getLinkdepth(), 0);
        assert.strictEqual(sr.getMethod(), RequestMethod.FIND);
        assert.strictEqual(sr.getQuery(),"*");
        assert.strictEqual(sr.getResponsesubject(),"response");
        assert.strictEqual(sr.getType(),"package");
        assert.deepStrictEqual(sr.getUuid(), uuid)
        
        var timeout = sr.getTimeout()
        
        if (typeof timeout != 'undefined') {
          assert.strictEqual(Util.toMs(timeout), 10000)
        }
      } else {
        assert.fail("SourceRequest was undefined")
      }
    })
    
    it('should have the correct Timestamp', () => {
      const ts = m.getTimestamp();
      
      if (typeof ts != "undefined") {
        assert.deepEqual(Util.toDate(ts), data.timestamp)
      }
    })
    
    it('should have the correct sourceduration', () => {
      const duration = m.getSourceduration();
      
      if (typeof duration != "undefined") {
        const date = Util.toDate(duration);
        
        assert.strictEqual((date.getSeconds() * 1000) + date.getMilliseconds(), data.sourceDuration);
      }
    })
    
    it('should have the correct sourcedurationperitem', () => {
      const duration = m.getSourcedurationperitem();
      
      if (typeof duration != "undefined") {
        const date = Util.toDate(duration);
        
        assert.strictEqual((date.getSeconds() * 1000) + date.getMilliseconds(), data.sourceDurationPerItem);
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
      assert.strictEqual(i.getType(), data.type)
    })
    
    it('should have the correct Uniqueattribute', () => {
      assert.strictEqual(i.getUniqueattribute(), data.uniqueAttribute)
    })
    
    it('should have the correct Attributes', () => {
      assert.strictEqual(i.getAttributes()?.getAttrstruct()?.toJavaScript()["name"], "Dylan");
    })
    
    it('should have the correct Metadata', () => {
      assert.strictEqual(i.getMetadata(), data.metadata)
    })
    
    it('should have the correct Context', () => {
      assert.strictEqual(i.getContext(), data.context)
    })
    
    it('should have the correct LinkeditemrequestsList', () => {
      assert.strictEqual(i.getLinkeditemrequestsList(), data.linkedItemRequests)
    })
    
    it('should have the correct LinkeditemsList', () => {
      assert.strictEqual(i.getLinkeditemsList(), data.linkedItems)
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
      assert.strictEqual(r.getResponder(), "test.context")
    })
    
    it('should have the correct State', () => {
      assert.strictEqual(r.getState(), ResponderState.ERROR)
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
        assert.deepStrictEqual(c.getUuid(), expected)
      })
    });
    
    describe('with a binary UUID', function() {
      const data: Util.CancelItemRequestData = {
        UUID: Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146]),
      }
      
      const c = Util.newCancelItemRequest(data);
      
      it('should have the correct UUID', () => {
        var expected = Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146])
        assert.deepStrictEqual(c.getUuid(), expected)
      })
    });
  });
  
  describe('#newGatewayRequest()', () => {
    describe('with an ItemRequestCancel', function() {
      const g = Util.newGatewayRequest({
        UUID: "bcee962c-ca60-479b-8a96-ab970d878392",
      }, 100)
      
      it('should be the correct type', () => {
        assert.strictEqual(g.hasCancel(), true)
        assert.strictEqual(g.hasRequest(), false)
      })
      
      it('should be the correct details', () => {
        var cancel = g.getCancel()
        var expected = Uint8Array.from([188, 238, 150, 44, 202, 96, 71, 155, 138, 150, 171, 151, 13, 135, 131, 146]);
        
        assert.notStrictEqual(cancel, undefined)
        assert.deepStrictEqual(cancel?.getUuid_asU8(), expected)
        assert.deepStrictEqual(g.getMinstatusinterval(), Util.toDuration(100))
        
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
        assert.strictEqual(g.hasCancel(), false)
        assert.strictEqual(g.hasRequest(), true)
      })
      
      it('should be the correct details', () => {
        var req = g.getRequest();
        
        assert.notEqual(req, undefined);
        
        if (typeof req != 'undefined') {
          assert.strictEqual(req.getType(), data.type);
          assert.strictEqual(req.getMethod(), RequestMethod.GET);
          assert.strictEqual(req.getQuery(), data.query);
          assert.strictEqual(req.getLinkdepth(), data.linkDepth);
          assert.strictEqual(req.getContext(), data.context);
          assert.strictEqual(req.getItemsubject(), data.itemSubject);
          assert.strictEqual(req.getResponsesubject(), data.responseSubject);
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
      assert.strictEqual(e.hasFrom(), true);
      assert.strictEqual(e.hasTo(), true);
  
      assert.strictEqual(e.getFrom()?.getContext(), 'global');
      assert.strictEqual(e.getTo()?.getContext(), 'global');
      assert.strictEqual(e.getFrom()?.getType(), 'person');
      assert.strictEqual(e.getTo()?.getType(), 'person');
      assert.strictEqual(e.getFrom()?.getUniqueattributevalue(), 'dylan');
      assert.strictEqual(e.getTo()?.getUniqueattributevalue(), 'katelyn');
    })
  })

  describe('#newGatewayRequestStatus()', function() {
    var states = new Map<string, ResponderStateMap[keyof ResponderStateMap]>();
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

    it('should have an accurate summary', () => {
      it('should have the correct value for Cancelled', () => {
        assert.strictEqual(s.getSummary()?.getCancelled(), 1);
      })
      it('should have the correct value for Complete', () => {
        assert.strictEqual(s.getSummary()?.getComplete(), 1);
      })
      it('should have the correct value for Error', () => {
        assert.strictEqual(s.getSummary()?.getError(), 1);
      })
      it('should have the correct value for Responders', () => {
        assert.strictEqual(s.getSummary()?.getResponders(), 4);
      })
      it('should have the correct value for Stalled', () => {
        assert.strictEqual(s.getSummary()?.getStalled(), 1);
      })
      it('should have the correct value for Working', () => {
        assert.strictEqual(s.getSummary()?.getWorking(), 0);
      })
    })

    it('should have postProcessingComplete', () => {
      assert.strictEqual(s.getPostprocessingcomplete(), false);
    })

    it('should have responders map with enough entries', () => {
      var finalResponders = s.getResponderstatesMap();

      assert.strictEqual(finalResponders.getLength(), 4);

      for (let [responder, state] of states) {
        it(`Responder ${responder} state matches`, () => {
          assert.strictEqual(finalResponders.get(responder), state);
        })
      }
    })

  })

  describe('#gatewayRequestStatusDone()', function() {
    var states = new Map<string, ResponderStateMap[keyof ResponderStateMap]>();
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
      assert.strictEqual(Util.gatewayRequestStatusDone(s), false);
    })

    it('handles when all responders are complete but post-processing isnt', () => {
      s.getSummary()?.setWorking(0);
      s.getSummary()?.setComplete(2);
      assert.strictEqual(Util.gatewayRequestStatusDone(s), false);
    })

    it('handles when all responders are complete and so is prost-processing', () => {
      s.setPostprocessingcomplete(true);
      assert.strictEqual(Util.gatewayRequestStatusDone(s), true);
    })

    it('handles when post processing is complete and workers arent', () => {
      s.getSummary()?.setWorking(1);
      assert.strictEqual(Util.gatewayRequestStatusDone(s), false);
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
        assert.strictEqual(resp.hasNewitem(), true);
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
        assert.strictEqual(resp.hasNewedge(), true);
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
        assert.strictEqual(resp.hasNewitemrequesterror(), true);
      })
    })
    describe('with GatewayRequestStatusData', () => {
      var states = new Map<string, ResponderStateMap[keyof ResponderStateMap]>();
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
        assert.strictEqual(resp.hasStatus(), true);
      })
    })
    describe('with string', () => {
      const data = "foo"

      it('should return the correct type', () => {
        const resp = Util.newGatewayResponse(data);
        assert.strictEqual(resp.hasError(), true);
      })
    })
  })
});
