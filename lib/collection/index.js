import add from './add'
import list from './list'

export default function collection(localPath) {
  return {
    db: this.db,
    localPath: localPath,
    add,
    list
  }
}