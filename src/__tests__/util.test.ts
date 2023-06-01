import {
  newDuration,
  newItemAttributes,
  newTimestamp,
  getAttributeValue,
  getUniqueAttributeValue,
  getGloballyUniqueName,
  toReference,
} from '../util'
import { Item } from '../protobuf'

describe('Util namespace', () => {
  describe('#newTimestamp', () => {
    it('returns the correct date', () => {
      const now = new Date()
      const ts = newTimestamp(now)

      expect(now.toISOString()).toEqual(ts.toDate().toISOString())
    })
  })

  describe('#newDuration', () => {
    it('returns the correct time', () => {
      const d = newDuration(1)

      expect(d.seconds).toBe(BigInt(0))
      expect(d.nanos).toBe(1_000_000)
    })
  })

  describe('#newReference', () => {
    it('returns a fully populated reference', () => {
      const item = new Item({
        type: 'person',
        uniqueAttribute: 'name',
        attributes: newItemAttributes({
          name: 'dylan',
        }),
        scope: 'global',
      })

      const ref = toReference(item)

      expect(ref.scope).toEqual('global')
      expect(ref.type).toEqual('person')
      expect(ref.uniqueAttributeValue).toEqual('dylan')
    })
  })

  describe('#getAttributeValue', () => {
    it('returns the correct value', () => {
      const attrs = newItemAttributes({
        foo: 'bar',
      })

      const val = getAttributeValue(attrs, 'foo')

      expect(val).toEqual('bar')
    })
  })

  describe('#getUniqueAttributeValue', () => {
    it('returns the correct value', () => {
      const item = new Item({
        type: 'person',
        uniqueAttribute: 'name',
        attributes: newItemAttributes({
          name: 'dylan',
        }),
      })

      const uav = getUniqueAttributeValue(item)

      expect(uav).toEqual('dylan')
    })
  })

  describe('#getGloballyUniqueName', () => {
    it('returns the correct value', () => {
      const item = new Item({
        type: 'person',
        uniqueAttribute: 'name',
        scope: 'scope',
        attributes: newItemAttributes({
          name: 'dylan',
        }),
      })

      const name = getGloballyUniqueName(item)

      expect(name).toEqual('scope.person.dylan')
    })
  })
})
