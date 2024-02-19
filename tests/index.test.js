import index from '../lib/index'
import useDB from '../lib/useDB'

describe('index file', () => {
  test('returns the useDB() function', () => {
    expect(index).toEqual(useDB)
  })
})