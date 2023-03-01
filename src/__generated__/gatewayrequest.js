// source: gateway.proto
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

goog.provide('proto.GatewayRequest');
goog.provide('proto.GatewayRequest.RequestTypeCase');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.CancelItemRequest');
goog.require('proto.DeleteSnapshot');
goog.require('proto.ExpandItemRequest');
goog.require('proto.ItemRequest');
goog.require('proto.ListSnapshots');
goog.require('proto.LoadSnapshot');
goog.require('proto.Reference');
goog.require('proto.StoreSnapshot');
goog.require('proto.UndoItemRequest');
goog.require('proto.google.protobuf.Duration');

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
proto.GatewayRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.GatewayRequest.oneofGroups_);
};
goog.inherits(proto.GatewayRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GatewayRequest.displayName = 'proto.GatewayRequest';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.GatewayRequest.oneofGroups_ = [[1,3,4,5,6,7,8,9,10,11,12]];

/**
 * @enum {number}
 */
proto.GatewayRequest.RequestTypeCase = {
  REQUEST_TYPE_NOT_SET: 0,
  NEWREQUEST: 1,
  CANCELREQUEST: 3,
  UNDOREQUEST: 4,
  EXCLUDEITEM: 5,
  INCLUDEITEM: 6,
  EXPANDITEM: 7,
  UNEXPANDITEM: 8,
  LISTSNAPSHOTS: 9,
  STORESNAPSHOT: 10,
  LOADSNAPSHOT: 11,
  DELETESNAPSHOT: 12
};

/**
 * @return {proto.GatewayRequest.RequestTypeCase}
 */
proto.GatewayRequest.prototype.getRequestTypeCase = function() {
  return /** @type {proto.GatewayRequest.RequestTypeCase} */(jspb.Message.computeOneofCase(this, proto.GatewayRequest.oneofGroups_[0]));
};



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
proto.GatewayRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.GatewayRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GatewayRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    newrequest: (f = msg.getNewrequest()) && proto.ItemRequest.toObject(includeInstance, f),
    cancelrequest: (f = msg.getCancelrequest()) && proto.CancelItemRequest.toObject(includeInstance, f),
    undorequest: (f = msg.getUndorequest()) && proto.UndoItemRequest.toObject(includeInstance, f),
    excludeitem: (f = msg.getExcludeitem()) && proto.Reference.toObject(includeInstance, f),
    includeitem: (f = msg.getIncludeitem()) && proto.Reference.toObject(includeInstance, f),
    expanditem: (f = msg.getExpanditem()) && proto.ExpandItemRequest.toObject(includeInstance, f),
    unexpanditem: (f = msg.getUnexpanditem()) && proto.Reference.toObject(includeInstance, f),
    listsnapshots: (f = msg.getListsnapshots()) && proto.ListSnapshots.toObject(includeInstance, f),
    storesnapshot: (f = msg.getStoresnapshot()) && proto.StoreSnapshot.toObject(includeInstance, f),
    loadsnapshot: (f = msg.getLoadsnapshot()) && proto.LoadSnapshot.toObject(includeInstance, f),
    deletesnapshot: (f = msg.getDeletesnapshot()) && proto.DeleteSnapshot.toObject(includeInstance, f),
    minstatusinterval: (f = msg.getMinstatusinterval()) && proto.google.protobuf.Duration.toObject(includeInstance, f)
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
 * @return {!proto.GatewayRequest}
 */
proto.GatewayRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GatewayRequest;
  return proto.GatewayRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GatewayRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GatewayRequest}
 */
proto.GatewayRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ItemRequest;
      reader.readMessage(value,proto.ItemRequest.deserializeBinaryFromReader);
      msg.setNewrequest(value);
      break;
    case 3:
      var value = new proto.CancelItemRequest;
      reader.readMessage(value,proto.CancelItemRequest.deserializeBinaryFromReader);
      msg.setCancelrequest(value);
      break;
    case 4:
      var value = new proto.UndoItemRequest;
      reader.readMessage(value,proto.UndoItemRequest.deserializeBinaryFromReader);
      msg.setUndorequest(value);
      break;
    case 5:
      var value = new proto.Reference;
      reader.readMessage(value,proto.Reference.deserializeBinaryFromReader);
      msg.setExcludeitem(value);
      break;
    case 6:
      var value = new proto.Reference;
      reader.readMessage(value,proto.Reference.deserializeBinaryFromReader);
      msg.setIncludeitem(value);
      break;
    case 7:
      var value = new proto.ExpandItemRequest;
      reader.readMessage(value,proto.ExpandItemRequest.deserializeBinaryFromReader);
      msg.setExpanditem(value);
      break;
    case 8:
      var value = new proto.Reference;
      reader.readMessage(value,proto.Reference.deserializeBinaryFromReader);
      msg.setUnexpanditem(value);
      break;
    case 9:
      var value = new proto.ListSnapshots;
      reader.readMessage(value,proto.ListSnapshots.deserializeBinaryFromReader);
      msg.setListsnapshots(value);
      break;
    case 10:
      var value = new proto.StoreSnapshot;
      reader.readMessage(value,proto.StoreSnapshot.deserializeBinaryFromReader);
      msg.setStoresnapshot(value);
      break;
    case 11:
      var value = new proto.LoadSnapshot;
      reader.readMessage(value,proto.LoadSnapshot.deserializeBinaryFromReader);
      msg.setLoadsnapshot(value);
      break;
    case 12:
      var value = new proto.DeleteSnapshot;
      reader.readMessage(value,proto.DeleteSnapshot.deserializeBinaryFromReader);
      msg.setDeletesnapshot(value);
      break;
    case 2:
      var value = new proto.google.protobuf.Duration;
      reader.readMessage(value,proto.google.protobuf.Duration.deserializeBinaryFromReader);
      msg.setMinstatusinterval(value);
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
proto.GatewayRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GatewayRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GatewayRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNewrequest();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.ItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getCancelrequest();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.CancelItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getUndorequest();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.UndoItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getExcludeitem();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.Reference.serializeBinaryToWriter
    );
  }
  f = message.getIncludeitem();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.Reference.serializeBinaryToWriter
    );
  }
  f = message.getExpanditem();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.ExpandItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getUnexpanditem();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.Reference.serializeBinaryToWriter
    );
  }
  f = message.getListsnapshots();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.ListSnapshots.serializeBinaryToWriter
    );
  }
  f = message.getStoresnapshot();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.StoreSnapshot.serializeBinaryToWriter
    );
  }
  f = message.getLoadsnapshot();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.LoadSnapshot.serializeBinaryToWriter
    );
  }
  f = message.getDeletesnapshot();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.DeleteSnapshot.serializeBinaryToWriter
    );
  }
  f = message.getMinstatusinterval();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.google.protobuf.Duration.serializeBinaryToWriter
    );
  }
};


/**
 * optional ItemRequest newRequest = 1;
 * @return {?proto.ItemRequest}
 */
proto.GatewayRequest.prototype.getNewrequest = function() {
  return /** @type{?proto.ItemRequest} */ (
    jspb.Message.getWrapperField(this, proto.ItemRequest, 1));
};


/**
 * @param {?proto.ItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setNewrequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearNewrequest = function() {
  return this.setNewrequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasNewrequest = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CancelItemRequest cancelRequest = 3;
 * @return {?proto.CancelItemRequest}
 */
proto.GatewayRequest.prototype.getCancelrequest = function() {
  return /** @type{?proto.CancelItemRequest} */ (
    jspb.Message.getWrapperField(this, proto.CancelItemRequest, 3));
};


/**
 * @param {?proto.CancelItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setCancelrequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearCancelrequest = function() {
  return this.setCancelrequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasCancelrequest = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional UndoItemRequest undoRequest = 4;
 * @return {?proto.UndoItemRequest}
 */
proto.GatewayRequest.prototype.getUndorequest = function() {
  return /** @type{?proto.UndoItemRequest} */ (
    jspb.Message.getWrapperField(this, proto.UndoItemRequest, 4));
};


/**
 * @param {?proto.UndoItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setUndorequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearUndorequest = function() {
  return this.setUndorequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasUndorequest = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional Reference excludeItem = 5;
 * @return {?proto.Reference}
 */
proto.GatewayRequest.prototype.getExcludeitem = function() {
  return /** @type{?proto.Reference} */ (
    jspb.Message.getWrapperField(this, proto.Reference, 5));
};


/**
 * @param {?proto.Reference|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setExcludeitem = function(value) {
  return jspb.Message.setOneofWrapperField(this, 5, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearExcludeitem = function() {
  return this.setExcludeitem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasExcludeitem = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional Reference includeItem = 6;
 * @return {?proto.Reference}
 */
proto.GatewayRequest.prototype.getIncludeitem = function() {
  return /** @type{?proto.Reference} */ (
    jspb.Message.getWrapperField(this, proto.Reference, 6));
};


/**
 * @param {?proto.Reference|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setIncludeitem = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearIncludeitem = function() {
  return this.setIncludeitem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasIncludeitem = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional ExpandItemRequest expandItem = 7;
 * @return {?proto.ExpandItemRequest}
 */
proto.GatewayRequest.prototype.getExpanditem = function() {
  return /** @type{?proto.ExpandItemRequest} */ (
    jspb.Message.getWrapperField(this, proto.ExpandItemRequest, 7));
};


/**
 * @param {?proto.ExpandItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setExpanditem = function(value) {
  return jspb.Message.setOneofWrapperField(this, 7, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearExpanditem = function() {
  return this.setExpanditem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasExpanditem = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional Reference unexpandItem = 8;
 * @return {?proto.Reference}
 */
proto.GatewayRequest.prototype.getUnexpanditem = function() {
  return /** @type{?proto.Reference} */ (
    jspb.Message.getWrapperField(this, proto.Reference, 8));
};


/**
 * @param {?proto.Reference|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setUnexpanditem = function(value) {
  return jspb.Message.setOneofWrapperField(this, 8, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearUnexpanditem = function() {
  return this.setUnexpanditem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasUnexpanditem = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional ListSnapshots listSnapshots = 9;
 * @return {?proto.ListSnapshots}
 */
proto.GatewayRequest.prototype.getListsnapshots = function() {
  return /** @type{?proto.ListSnapshots} */ (
    jspb.Message.getWrapperField(this, proto.ListSnapshots, 9));
};


/**
 * @param {?proto.ListSnapshots|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setListsnapshots = function(value) {
  return jspb.Message.setOneofWrapperField(this, 9, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearListsnapshots = function() {
  return this.setListsnapshots(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasListsnapshots = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional StoreSnapshot storeSnapshot = 10;
 * @return {?proto.StoreSnapshot}
 */
proto.GatewayRequest.prototype.getStoresnapshot = function() {
  return /** @type{?proto.StoreSnapshot} */ (
    jspb.Message.getWrapperField(this, proto.StoreSnapshot, 10));
};


/**
 * @param {?proto.StoreSnapshot|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setStoresnapshot = function(value) {
  return jspb.Message.setOneofWrapperField(this, 10, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearStoresnapshot = function() {
  return this.setStoresnapshot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasStoresnapshot = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional LoadSnapshot loadSnapshot = 11;
 * @return {?proto.LoadSnapshot}
 */
proto.GatewayRequest.prototype.getLoadsnapshot = function() {
  return /** @type{?proto.LoadSnapshot} */ (
    jspb.Message.getWrapperField(this, proto.LoadSnapshot, 11));
};


/**
 * @param {?proto.LoadSnapshot|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setLoadsnapshot = function(value) {
  return jspb.Message.setOneofWrapperField(this, 11, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearLoadsnapshot = function() {
  return this.setLoadsnapshot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasLoadsnapshot = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional DeleteSnapshot deleteSnapshot = 12;
 * @return {?proto.DeleteSnapshot}
 */
proto.GatewayRequest.prototype.getDeletesnapshot = function() {
  return /** @type{?proto.DeleteSnapshot} */ (
    jspb.Message.getWrapperField(this, proto.DeleteSnapshot, 12));
};


/**
 * @param {?proto.DeleteSnapshot|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setDeletesnapshot = function(value) {
  return jspb.Message.setOneofWrapperField(this, 12, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearDeletesnapshot = function() {
  return this.setDeletesnapshot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasDeletesnapshot = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional google.protobuf.Duration minStatusInterval = 2;
 * @return {?proto.google.protobuf.Duration}
 */
proto.GatewayRequest.prototype.getMinstatusinterval = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, proto.google.protobuf.Duration, 2));
};


/**
 * @param {?proto.google.protobuf.Duration|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setMinstatusinterval = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearMinstatusinterval = function() {
  return this.setMinstatusinterval(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasMinstatusinterval = function() {
  return jspb.Message.getField(this, 2) != null;
};


