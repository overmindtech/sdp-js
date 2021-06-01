import { Util, Item, ItemAttributes } from '..';
import * as testData from './items';
import * as assert from 'assert';
import { Struct } from "google-protobuf/google/protobuf/struct_pb";


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

});
