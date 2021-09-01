import { Util, Item, ItemAttributes, RequestMethod } from '..';
import * as testData from './items';
import * as assert from 'assert';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";
import { expect } from 'chai';
import { ItemRequestError } from '../errors_pb';


describe('Util', function() {
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
        linkedItemSubject: "subject2",
        responseSubject: "subject3",
        errorSubject: "subject4",
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

      it('should have the correct Linkeditemsubject', () => {
        assert.strictEqual(ir.getLinkeditemsubject(), data.linkedItemSubject);
      })

      it('should have the correct Responsesubject', () => {
        assert.strictEqual(ir.getResponsesubject(), data.responseSubject);
      })

      it('should have the correct Errorsubject', () => {
        assert.strictEqual(ir.getErrorsubject(), data.errorSubject);
      })

  });

  describe('#newMetadata()', function() {
    const data: Util.MetadataData = {
      backendName: "packages",
      requestMethod: "FIND",
      timestamp: new Date(),
      backendDuration: 1638,
      backendDurationPerItem: 23,
      backendPackage: "yum",
    }

    const m = Util.newMetadata(data);

    it('should have the correct Backendname', () => {
      assert.strictEqual(m.getBackendname(), data.backendName)
    })

    it('should have the correct Requestmethod', () => {
      assert.strictEqual(m.getRequestmethod(), RequestMethod.FIND)
    })

    it('should have the correct Timestamp', () => {
      const ts = m.getTimestamp();

      if (typeof ts != "undefined") {
        assert.deepEqual(Util.toDate(ts), data.timestamp)
      }
    })

    it('should have the correct Backendduration', () => {
      const duration = m.getBackendduration();

      if (typeof duration != "undefined") {
        const date = Util.toDate(duration);

        assert.strictEqual(
          (date.getSeconds() * 1000) + date.getMilliseconds(),
          data.backendDuration
        )
      }
    })

    it('should have the correct Backenddurationperitem', () => {
      const duration = m.getBackenddurationperitem();

      if (typeof duration != "undefined") {
        const date = Util.toDate(duration);

        assert.strictEqual(
          (date.getSeconds() * 1000) + date.getMilliseconds(),
          data.backendDurationPerItem
        )
      }    
    })

    it('should have the correct Backendpackage', () => {
      assert.strictEqual(m.getBackendpackage(), data.backendPackage)
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
      assert.strictEqual(
        i.getAttributes()?.getAttrstruct()?.toJavaScript()["name"],
        "Dylan" 
      )
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

});
