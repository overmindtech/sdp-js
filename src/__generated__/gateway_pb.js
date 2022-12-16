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

var isBrowser = typeof window !== 'undefined'
var jspb = require('google-protobuf');
var goog = jspb;
var global = isBrowser ? (function() { return this || window || global || self || Function('return this')(); }).call(null) : {}

var items_pb = require('./items_pb.js');
goog.object.extend(proto, items_pb);
var responses_pb = require('./responses_pb.js');
goog.object.extend(proto, responses_pb);
var google_protobuf_duration_pb = require('google-protobuf/google/protobuf/duration_pb.js');
goog.object.extend(proto, google_protobuf_duration_pb);
goog.exportSymbol('proto.GatewayRequest', null, global);
goog.exportSymbol('proto.GatewayRequest.RequestTypeCase', null, global);
goog.exportSymbol('proto.GatewayRequestStatus', null, global);
goog.exportSymbol('proto.GatewayRequestStatus.Summary', null, global);
goog.exportSymbol('proto.GatewayResponse', null, global);
goog.exportSymbol('proto.GatewayResponse.ResponseTypeCase', null, global);
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
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.GatewayResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.GatewayResponse.oneofGroups_);
};
goog.inherits(proto.GatewayResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GatewayResponse.displayName = 'proto.GatewayResponse';
}
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
proto.GatewayRequestStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GatewayRequestStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GatewayRequestStatus.displayName = 'proto.GatewayRequestStatus';
}
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
proto.GatewayRequestStatus.Summary = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.GatewayRequestStatus.Summary, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.GatewayRequestStatus.Summary.displayName = 'proto.GatewayRequestStatus.Summary';
}

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.GatewayRequest.oneofGroups_ = [[1,3]];

/**
 * @enum {number}
 */
proto.GatewayRequest.RequestTypeCase = {
  REQUEST_TYPE_NOT_SET: 0,
  REQUEST: 1,
  CANCEL: 3
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
    request: (f = msg.getRequest()) && items_pb.ItemRequest.toObject(includeInstance, f),
    cancel: (f = msg.getCancel()) && items_pb.CancelItemRequest.toObject(includeInstance, f),
    minstatusinterval: (f = msg.getMinstatusinterval()) && google_protobuf_duration_pb.Duration.toObject(includeInstance, f)
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
      var value = new items_pb.ItemRequest;
      reader.readMessage(value,items_pb.ItemRequest.deserializeBinaryFromReader);
      msg.setRequest(value);
      break;
    case 3:
      var value = new items_pb.CancelItemRequest;
      reader.readMessage(value,items_pb.CancelItemRequest.deserializeBinaryFromReader);
      msg.setCancel(value);
      break;
    case 2:
      var value = new google_protobuf_duration_pb.Duration;
      reader.readMessage(value,google_protobuf_duration_pb.Duration.deserializeBinaryFromReader);
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
  f = message.getRequest();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      items_pb.ItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getCancel();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      items_pb.CancelItemRequest.serializeBinaryToWriter
    );
  }
  f = message.getMinstatusinterval();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_duration_pb.Duration.serializeBinaryToWriter
    );
  }
};


/**
 * optional ItemRequest request = 1;
 * @return {?proto.ItemRequest}
 */
proto.GatewayRequest.prototype.getRequest = function() {
  return /** @type{?proto.ItemRequest} */ (
    jspb.Message.getWrapperField(this, items_pb.ItemRequest, 1));
};


/**
 * @param {?proto.ItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setRequest = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearRequest = function() {
  return this.setRequest(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasRequest = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional CancelItemRequest cancel = 3;
 * @return {?proto.CancelItemRequest}
 */
proto.GatewayRequest.prototype.getCancel = function() {
  return /** @type{?proto.CancelItemRequest} */ (
    jspb.Message.getWrapperField(this, items_pb.CancelItemRequest, 3));
};


/**
 * @param {?proto.CancelItemRequest|undefined} value
 * @return {!proto.GatewayRequest} returns this
*/
proto.GatewayRequest.prototype.setCancel = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.GatewayRequest.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequest} returns this
 */
proto.GatewayRequest.prototype.clearCancel = function() {
  return this.setCancel(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequest.prototype.hasCancel = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional google.protobuf.Duration minStatusInterval = 2;
 * @return {?proto.google.protobuf.Duration}
 */
proto.GatewayRequest.prototype.getMinstatusinterval = function() {
  return /** @type{?proto.google.protobuf.Duration} */ (
    jspb.Message.getWrapperField(this, google_protobuf_duration_pb.Duration, 2));
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



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.GatewayResponse.oneofGroups_ = [[2,3,6,4,5]];

/**
 * @enum {number}
 */
proto.GatewayResponse.ResponseTypeCase = {
  RESPONSE_TYPE_NOT_SET: 0,
  NEWITEM: 2,
  NEWEDGE: 3,
  NEWITEMREQUESTERROR: 6,
  STATUS: 4,
  ERROR: 5
};

/**
 * @return {proto.GatewayResponse.ResponseTypeCase}
 */
proto.GatewayResponse.prototype.getResponseTypeCase = function() {
  return /** @type {proto.GatewayResponse.ResponseTypeCase} */(jspb.Message.computeOneofCase(this, proto.GatewayResponse.oneofGroups_[0]));
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
proto.GatewayResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.GatewayResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GatewayResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    newitem: (f = msg.getNewitem()) && items_pb.Item.toObject(includeInstance, f),
    newedge: (f = msg.getNewedge()) && items_pb.Edge.toObject(includeInstance, f),
    newitemrequesterror: (f = msg.getNewitemrequesterror()) && responses_pb.ItemRequestError.toObject(includeInstance, f),
    status: (f = msg.getStatus()) && proto.GatewayRequestStatus.toObject(includeInstance, f),
    error: jspb.Message.getFieldWithDefault(msg, 5, "")
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
 * @return {!proto.GatewayResponse}
 */
proto.GatewayResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GatewayResponse;
  return proto.GatewayResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GatewayResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GatewayResponse}
 */
proto.GatewayResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 2:
      var value = new items_pb.Item;
      reader.readMessage(value,items_pb.Item.deserializeBinaryFromReader);
      msg.setNewitem(value);
      break;
    case 3:
      var value = new items_pb.Edge;
      reader.readMessage(value,items_pb.Edge.deserializeBinaryFromReader);
      msg.setNewedge(value);
      break;
    case 6:
      var value = new responses_pb.ItemRequestError;
      reader.readMessage(value,responses_pb.ItemRequestError.deserializeBinaryFromReader);
      msg.setNewitemrequesterror(value);
      break;
    case 4:
      var value = new proto.GatewayRequestStatus;
      reader.readMessage(value,proto.GatewayRequestStatus.deserializeBinaryFromReader);
      msg.setStatus(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
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
proto.GatewayResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GatewayResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GatewayResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNewitem();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      items_pb.Item.serializeBinaryToWriter
    );
  }
  f = message.getNewedge();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      items_pb.Edge.serializeBinaryToWriter
    );
  }
  f = message.getNewitemrequesterror();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      responses_pb.ItemRequestError.serializeBinaryToWriter
    );
  }
  f = message.getStatus();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.GatewayRequestStatus.serializeBinaryToWriter
    );
  }
  f = /** @type {string} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeString(
      5,
      f
    );
  }
};


/**
 * optional Item newItem = 2;
 * @return {?proto.Item}
 */
proto.GatewayResponse.prototype.getNewitem = function() {
  return /** @type{?proto.Item} */ (
    jspb.Message.getWrapperField(this, items_pb.Item, 2));
};


/**
 * @param {?proto.Item|undefined} value
 * @return {!proto.GatewayResponse} returns this
*/
proto.GatewayResponse.prototype.setNewitem = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.GatewayResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.clearNewitem = function() {
  return this.setNewitem(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayResponse.prototype.hasNewitem = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Edge newEdge = 3;
 * @return {?proto.Edge}
 */
proto.GatewayResponse.prototype.getNewedge = function() {
  return /** @type{?proto.Edge} */ (
    jspb.Message.getWrapperField(this, items_pb.Edge, 3));
};


/**
 * @param {?proto.Edge|undefined} value
 * @return {!proto.GatewayResponse} returns this
*/
proto.GatewayResponse.prototype.setNewedge = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.GatewayResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.clearNewedge = function() {
  return this.setNewedge(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayResponse.prototype.hasNewedge = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional ItemRequestError newItemRequestError = 6;
 * @return {?proto.ItemRequestError}
 */
proto.GatewayResponse.prototype.getNewitemrequesterror = function() {
  return /** @type{?proto.ItemRequestError} */ (
    jspb.Message.getWrapperField(this, responses_pb.ItemRequestError, 6));
};


/**
 * @param {?proto.ItemRequestError|undefined} value
 * @return {!proto.GatewayResponse} returns this
*/
proto.GatewayResponse.prototype.setNewitemrequesterror = function(value) {
  return jspb.Message.setOneofWrapperField(this, 6, proto.GatewayResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.clearNewitemrequesterror = function() {
  return this.setNewitemrequesterror(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayResponse.prototype.hasNewitemrequesterror = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional GatewayRequestStatus status = 4;
 * @return {?proto.GatewayRequestStatus}
 */
proto.GatewayResponse.prototype.getStatus = function() {
  return /** @type{?proto.GatewayRequestStatus} */ (
    jspb.Message.getWrapperField(this, proto.GatewayRequestStatus, 4));
};


/**
 * @param {?proto.GatewayRequestStatus|undefined} value
 * @return {!proto.GatewayResponse} returns this
*/
proto.GatewayResponse.prototype.setStatus = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.GatewayResponse.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.clearStatus = function() {
  return this.setStatus(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayResponse.prototype.hasStatus = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string error = 5;
 * @return {string}
 */
proto.GatewayResponse.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.setError = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.GatewayResponse.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.GatewayResponse} returns this
 */
proto.GatewayResponse.prototype.clearError = function() {
  return jspb.Message.setOneofField(this, 5, proto.GatewayResponse.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayResponse.prototype.hasError = function() {
  return jspb.Message.getField(this, 5) != null;
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
proto.GatewayRequestStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.GatewayRequestStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GatewayRequestStatus} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequestStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
    responderstatesMap: (f = msg.getResponderstatesMap()) ? f.toObject(includeInstance, undefined) : [],
    summary: (f = msg.getSummary()) && proto.GatewayRequestStatus.Summary.toObject(includeInstance, f),
    postprocessingcomplete: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
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
 * @return {!proto.GatewayRequestStatus}
 */
proto.GatewayRequestStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GatewayRequestStatus;
  return proto.GatewayRequestStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GatewayRequestStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GatewayRequestStatus}
 */
proto.GatewayRequestStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getResponderstatesMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readEnum, null, "", 0);
         });
      break;
    case 3:
      var value = new proto.GatewayRequestStatus.Summary;
      reader.readMessage(value,proto.GatewayRequestStatus.Summary.deserializeBinaryFromReader);
      msg.setSummary(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setPostprocessingcomplete(value);
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
proto.GatewayRequestStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GatewayRequestStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GatewayRequestStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequestStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getResponderstatesMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeEnum);
  }
  f = message.getSummary();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.GatewayRequestStatus.Summary.serializeBinaryToWriter
    );
  }
  f = message.getPostprocessingcomplete();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
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
proto.GatewayRequestStatus.Summary.prototype.toObject = function(opt_includeInstance) {
  return proto.GatewayRequestStatus.Summary.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.GatewayRequestStatus.Summary} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequestStatus.Summary.toObject = function(includeInstance, msg) {
  var f, obj = {
    working: jspb.Message.getFieldWithDefault(msg, 1, 0),
    stalled: jspb.Message.getFieldWithDefault(msg, 2, 0),
    complete: jspb.Message.getFieldWithDefault(msg, 3, 0),
    error: jspb.Message.getFieldWithDefault(msg, 4, 0),
    cancelled: jspb.Message.getFieldWithDefault(msg, 5, 0),
    responders: jspb.Message.getFieldWithDefault(msg, 6, 0)
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
 * @return {!proto.GatewayRequestStatus.Summary}
 */
proto.GatewayRequestStatus.Summary.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.GatewayRequestStatus.Summary;
  return proto.GatewayRequestStatus.Summary.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.GatewayRequestStatus.Summary} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.GatewayRequestStatus.Summary}
 */
proto.GatewayRequestStatus.Summary.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setWorking(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStalled(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setComplete(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setError(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCancelled(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setResponders(value);
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
proto.GatewayRequestStatus.Summary.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.GatewayRequestStatus.Summary.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.GatewayRequestStatus.Summary} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.GatewayRequestStatus.Summary.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getWorking();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getStalled();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getComplete();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getError();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
  f = message.getCancelled();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
  f = message.getResponders();
  if (f !== 0) {
    writer.writeInt32(
      6,
      f
    );
  }
};


/**
 * optional int32 working = 1;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getWorking = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setWorking = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int32 stalled = 2;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getStalled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setStalled = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 complete = 3;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getComplete = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setComplete = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int32 error = 4;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getError = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setError = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int32 cancelled = 5;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getCancelled = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setCancelled = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 responders = 6;
 * @return {number}
 */
proto.GatewayRequestStatus.Summary.prototype.getResponders = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.GatewayRequestStatus.Summary} returns this
 */
proto.GatewayRequestStatus.Summary.prototype.setResponders = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * map<string, ResponderState> responderStates = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.ResponderState>}
 */
proto.GatewayRequestStatus.prototype.getResponderstatesMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.ResponderState>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      null));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.GatewayRequestStatus} returns this
 */
proto.GatewayRequestStatus.prototype.clearResponderstatesMap = function() {
  this.getResponderstatesMap().clear();
  return this;};


/**
 * optional Summary summary = 3;
 * @return {?proto.GatewayRequestStatus.Summary}
 */
proto.GatewayRequestStatus.prototype.getSummary = function() {
  return /** @type{?proto.GatewayRequestStatus.Summary} */ (
    jspb.Message.getWrapperField(this, proto.GatewayRequestStatus.Summary, 3));
};


/**
 * @param {?proto.GatewayRequestStatus.Summary|undefined} value
 * @return {!proto.GatewayRequestStatus} returns this
*/
proto.GatewayRequestStatus.prototype.setSummary = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.GatewayRequestStatus} returns this
 */
proto.GatewayRequestStatus.prototype.clearSummary = function() {
  return this.setSummary(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.GatewayRequestStatus.prototype.hasSummary = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bool postProcessingComplete = 4;
 * @return {boolean}
 */
proto.GatewayRequestStatus.prototype.getPostprocessingcomplete = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.GatewayRequestStatus} returns this
 */
proto.GatewayRequestStatus.prototype.setPostprocessingcomplete = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


goog.object.extend(exports, proto);
