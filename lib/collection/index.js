import add from './add'
import update from './update'
import remove from './remove'
import list from './list'
import filter from './filter'
import get from './get'

export default function collection(localPath, remotePath = null) {
  return {
    db: this.db,
    localPath,
    remotePath,
    add,
    update,
    remove,
    list,
    filter,
    get
  }
}