import {
  newDuration,
  newItemAttributes,
  newTimestamp,
  getAttributeValue,
  getUniqueAttributeValue,
  getGloballyUniqueName,
} from '../Util'
import { Item } from '../Protobuf'

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
