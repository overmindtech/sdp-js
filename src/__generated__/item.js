// source: items.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.Item');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.ItemAttributes');
goog.require('proto.ItemRequest');
goog.require('proto.Metadata');
goog.require('proto.Reference');

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Item = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Item.repeatedFields_, null);
};
goog.inherits(proto.Item, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.Item.displayName = 'proto.Item';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Item.repeatedFields_ = [16,17];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Item.prototype.toObject = function(opt_includeInstance) {
  return proto.Item.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Item} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Item.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, ""),
    uniqueattribute: jspb.Message.getFieldWithDefault(msg, 2, ""),
    attributes: (f = msg.getAttributes()) && proto.ItemAttributes.toObject(includeInstance, f),
    metadata: (f = msg.getMetadata()) && proto.Metadata.toObject(includeInstance, f),
    scope: jspb.Message.getFieldWithDefault(msg, 5, ""),
    linkeditemrequestsList: jspb.Message.toObjectList(msg.getLinkeditemrequestsList(),
    proto.ItemRequest.toObject, includeInstance),
    linkeditemsList: jspb.Message.toObjectList(msg.getLinkeditemsList(),
    proto.Reference.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Item}
 */
proto.Item.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Item;
  return proto.Item.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Item} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Item}
 */
proto.Item.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setType(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUniqueattribute(value);
      break;
    case 3:
      var value = new proto.ItemAttributes;
      reader.readMessage(value,proto.ItemAttributes.deserializeBinaryFromReader);
      msg.setAttributes(value);
      break;
    case 4:
      var value = new proto.Metadata;
      reader.readMessage(value,proto.Metadata.deserializeBinaryFromReader);
      msg.setMetadata(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setScope(value);
      break;
    case 16:
      var value = new proto.ItemRequest;
      reader.readMessage(value,proto.ItemRequest.deserializeBinaryFromReader);
      msg.addLinkeditemrequests(value);
      break;
    case 17:
      var value = new proto.Reference;
      reader.readMessage(value,proto.Reference.deserializeBinaryFromReader);
      msg.addLinkeditems(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Item.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Item.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Item} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Item.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getUniqueattribute();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getAttributes();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.ItemAttributes.serializeBinaryToWriter
    );
  }
  f = message.getMetadata();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.Metadata.serializeBinaryToWriter
    );
  }
  f = message.getScope();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getLinkeditemrequestsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      16,
      f,
      proto.ItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getLinkeditemsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      17,
      f,
      proto.Reference.serializeBinaryToWriter
    );
  }
};


/**
 * optional string type = 1;
 * @return {string}
 */
proto.Item.prototype.getType = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.setType = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string uniqueAttribute = 2;
 * @return {string}
 */
proto.Item.prototype.getUniqueattribute = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.setUniqueattribute = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional ItemAttributes attributes = 3;
 * @return {?proto.ItemAttributes}
 */
proto.Item.prototype.getAttributes = function() {
  return /** @type{?proto.ItemAttributes} */ (
    jspb.Message.getWrapperField(this, proto.ItemAttributes, 3));
};


/**
 * @param {?proto.ItemAttributes|undefined} value
 * @return {!proto.Item} returns this
*/
proto.Item.prototype.setAttributes = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.clearAttributes = function() {
  return this.setAttributes(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Item.prototype.hasAttributes = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Metadata metadata = 4;
 * @return {?proto.Metadata}
 */
proto.Item.prototype.getMetadata = function() {
  return /** @type{?proto.Metadata} */ (
    jspb.Message.getWrapperField(this, proto.Metadata, 4));
};


/**
 * @param {?proto.Metadata|undefined} value
 * @return {!proto.Item} returns this
*/
proto.Item.prototype.setMetadata = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.clearMetadata = function() {
  return this.setMetadata(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.Item.prototype.hasMetadata = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string scope = 5;
 * @return {string}
 */
proto.Item.prototype.getScope = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.setScope = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * repeated ItemRequest linkedItemRequests = 16;
 * @return {!Array<!proto.ItemRequest>}
 */
proto.Item.prototype.getLinkeditemrequestsList = function() {
  return /** @type{!Array<!proto.ItemRequest>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ItemRequest, 16));
};


/**
 * @param {!Array<!proto.ItemRequest>} value
 * @return {!proto.Item} returns this
*/
proto.Item.prototype.setLinkeditemrequestsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 16, value);
};


/**
 * @param {!proto.ItemRequest=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ItemRequest}
 */
proto.Item.prototype.addLinkeditemrequests = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 16, opt_value, proto.ItemRequest, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.clearLinkeditemrequestsList = function() {
  return this.setLinkeditemrequestsList([]);
};


/**
 * repeated Reference linkedItems = 17;
 * @return {!Array<!proto.Reference>}
 */
proto.Item.prototype.getLinkeditemsList = function() {
  return /** @type{!Array<!proto.Reference>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Reference, 17));
};


/**
 * @param {!Array<!proto.Reference>} value
 * @return {!proto.Item} returns this
*/
proto.Item.prototype.setLinkeditemsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 17, value);
};


/**
 * @param {!proto.Reference=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Reference}
 */
proto.Item.prototype.addLinkeditems = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 17, opt_value, proto.Reference, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.Item} returns this
 */
proto.Item.prototype.clearLinkeditemsList = function() {
  return this.setLinkeditemsList([]);
};


