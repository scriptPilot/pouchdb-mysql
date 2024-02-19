import _ from 'lodash'
import add from './add'
import update from './update'
import set from './set'
import remove from './remove'
import list from './list'
import filter from './filter'
import get from './get'

export default (localPath, remotePath) => {
  if (!_.isString(localPath) || !_.size(localPath)) {
    throw new Error('"localPath" should be string')
  }
  if (!_.isUndefined(remotePath) && (!_.isString(remotePath) || !_.size(remotePath))) {
    throw new Error('"remotePath" should be string or undefined')
  }
  return {
    add,
    update,
    set,
    remove,
    list,
    filter,
    get
  }
}