import _ from 'lodash'
import collection from '../lib/collection'
import add from '../lib/add'
import update from '../lib/update'
import set from '../lib/set'
import remove from '../lib/remove'
import list from '../lib/list'
import filter from '../lib/filter'
import get from '../lib/get'

describe('collection() function', () => {
  test('accepts as first argument string only', () => {
    expect(() => collection('string')).not.toThrow()
    expect(() => collection('')).toThrow()
    expect(() => collection()).toThrow()
    expect(() => collection({})).toThrow()
    expect(() => collection(123)).toThrow()
  })
  test('accepts as second argument string or undefined only', () => {
    expect(() => collection('string', 'string')).not.toThrow()
    expect(() => collection('string')).not.toThrow()
    expect(() => collection('string', '')).toThrow()
    expect(() => collection('string', {})).toThrow()
    expect(() => collection('string', 123)).toThrow()
  })
  test.todo('creates PouchDB')
  test.todo('creates PouchDB with default database name')
  test.todo('creates PouchDB with passed database name')
  test('returns object', () => {
    expect(_.isObject(collection('string'))).toBe(true)
  })
  test('returns add property with add() function', () => {
    expect(collection('string')).toHaveProperty('add')
    expect(_.isFunction(add)).toBe(true)
    expect(collection('string').add).toEqual(add)
  })
  test('returns update property with update() function', () => {
    expect(collection('string')).toHaveProperty('update')
    expect(_.isFunction(update)).toBe(true)
    expect(collection('string').update).toEqual(update)
  })
  test('returns set property with set() function', () => {
    expect(collection('string')).toHaveProperty('set')
    expect(_.isFunction(set)).toBe(true)
    expect(collection('string').set).toEqual(set)
  })
  test('returns remove property with remove() function', () => {
    expect(collection('string')).toHaveProperty('remove')
    expect(_.isFunction(remove)).toBe(true)
    expect(collection('string').remove).toEqual(remove)
  })
  test('returns list property with list() function', () => {
    expect(collection('string')).toHaveProperty('list')
    expect(_.isFunction(list)).toBe(true)
    expect(collection('string').list).toEqual(list)
  })
  test('returns filter property with filter() function', () => {
    expect(collection('string')).toHaveProperty('filter')
    expect(_.isFunction(filter)).toBe(true)
    expect(collection('string').filter).toEqual(filter)
  })
  test('returns get property with get() function', () => {
    expect(collection('string')).toHaveProperty('get')
    expect(_.isFunction(get)).toBe(true)
    expect(collection('string').get).toEqual(get)
  })
})