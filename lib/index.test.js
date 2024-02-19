import index from './index'
import useDB from './useDB'

describe('index file', () => {
  test('returns the useDB() function', () => {
    expect(index).toEqual(useDB)
  })
})