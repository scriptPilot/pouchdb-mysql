import _ from 'lodash'
import list from './list'

describe('list() function', () => {
  test('accepts as last argument array only', () => {
    expect(() => list([])).not.toThrow()
    expect(() => list()).toThrow()
    expect(() => list({})).toThrow()
    expect(() => list('')).toThrow()
    expect(() => list(123)).toThrow()
  })
  test('returns array', () => {
    expect(_.isArray(list([]))).toBe(true)
  })
  test('returns full input array', () => {
    
  })
})