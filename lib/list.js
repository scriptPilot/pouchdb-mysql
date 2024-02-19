import _ from 'lodash'

export default (docs) => {
  if (!_.isArray(docs)) {
    throw new Error('"docs" argument should be an array')
  }
  return [...docs]  
}