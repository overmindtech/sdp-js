import { Duration, JsonValue, Struct, Timestamp } from "@bufbuild/protobuf"
import { Item, ItemAttributes, Reference } from "./__generated__"

/**
 * Creates a new ItemAttributes object from any javascript object that has
 * string keys
 * @param value Any object with string keys
 * @returns A new ItemAttributes object
 */
export function newItemAttributes(value: {
    [key: string]: JsonValue,
  }): ItemAttributes {
    const attributes = new ItemAttributes()
    attributes.attrStruct = new Struct();
    attributes.attrStruct.fromJson(value);
  
    return attributes
}

/**
 * Create a new timestamp object from a Date
 * @param date The date to convert
 * @returns A timestamp in protobuf format
 */
export function newTimestamp(date: Date): Timestamp {
    const t = new Timestamp();
    t.seconds = BigInt(Math.floor(date.getTime() / 1000));
    t.nanos = (date.getMilliseconds() * 1000000);
    return t
}

/**
 * Converts a number of milliseconds to a protobuf duration
 * @param ms The number of milliseconds
 * @returns A duration in protobuf format
 */
export function newDuration(ms: number): Duration {
  const d = new Duration({
    nanos: (ms % 1000) * 1e6,
    seconds: BigInt(Math.floor(ms / 1000))
  })

  return d
}

/**
 * Gets the value of a particular attribute. *Note:* that this only supports
 * attributes at the top level currently
 * @param attributes The attributes to query
 * @param name The name of the attribute you are looking for
 * @returns The value of the attribute
 */
export function getAttributeValue(attributes: ItemAttributes, name: string) {
  const j = attributes.attrStruct?.toJson()

  if (typeof j != 'undefined') {
    if (j != null) {
      return j[name]
    }
  }

  return undefined
}

/**
 * Gets the unique attribute value of an object
 * @param object The object to get the unique attribute value for
 * @returns The unique attribute value as a string
 */
export function getUniqueAttributeValue(object: Item | Reference): string {
  if ('uniqueAttributeValue' in object) {
    // If it's a reference we can return the value directly
    return object.uniqueAttributeValue
  }

  if (object.attributes !== undefined) {
    // If we have attributes then get that
    return String(getAttributeValue(object.attributes, object.uniqueAttribute))
  }

  return ''
}