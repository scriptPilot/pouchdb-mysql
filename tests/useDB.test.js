import _ from 'lodash'
import useDB from '../lib/useDB'
import collection from '../lib/collection'

describe('useDB() function', () => {
  test('accepts as first argument string or undefined only', () => {
    expect(() => useDB()).not.toThrow()
    expect(() => useDB('string')).not.toThrow()
    expect(() => useDB('')).toThrow()
    expect(() => useDB({})).toThrow()
    expect(() => useDB(123)).toThrow()
  })
  test.todo('creates PouchDB')
  test.todo('created PouchDB with default database name')
  test.todo('passes first argument to PouchDB')
  test('returns object', () => {
    expect(_.isObject(useDB())).toBe(true)
  })
  test('returns collection property with collection() function', () => {
    expect(useDB()).toHaveProperty('collection')
    expect(_.isFunction(useDB)).toBe(true)
    expect(useDB().collection).toEqual(collection)
  })
})