import add from './add'
import update from './update'
import list from './list'
import get from './get'

export default function collection(localPath) {
  return {
    db: this.db,
    localPath: localPath,
    add,
    update,
    list,
    get
  }
}