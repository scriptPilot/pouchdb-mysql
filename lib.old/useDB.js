import _ from 'lodash'
import collection from './collection'

export default (databaseName = 'database') => {
  if (!_.isUndefined(databaseName) && (!_.isString(databaseName) || !_.size(databaseName))) {
    throw Error('"databaseName" should be string or undefined')
  } 
  return {
    collection
  }
}