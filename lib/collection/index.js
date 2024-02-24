import { stateToMySQL } from './helper'
import add from './add'
import update from './update'
import remove from './remove'
import list from './list'
import get from './get'

export default function collection(localPath, remotePath = null) {
  const collection = {
    db: this.db,
    api: this.api,
    localPath,
    remotePath,
    add,
    update,
    remove,
    list,
    get
  }

  // Synchronization
  const localStorageKey = `sync>${localPath}>${remotePath}`
  let syncFromRemoteLast = parseInt(window.localStorage.getItem(localStorageKey+'>fromRemote'))
  async function sync() {
    const toLocal = !collection.remotePath.startsWith('to:')
    const toRemote = !collection.remotePath.startsWith('from:')    
    if (toRemote) {
      const now = Date.now()
      const docs = await collection.list()
      const updatedDocs = docs.filter(d => d.$synchronized === 0)
      for (let n = 0; n < updatedDocs.length; n++) {  
        const doc = updatedDocs[n]    
        const table = doc.$key.split('/')[0]
        const mySQLDoc = stateToMySQL(doc)
        try {
          const existingDoc = await collection.api.read(table, mySQLDoc.$key)
          if (existingDoc.$updated < mySQLDoc.$updated) {
            await collection.api.update(table, mySQLDoc.$key, mySQLDoc)
          }
        } catch (err) {
          if (!err.code) throw err
          await collection.api.create(table, mySQLDoc)
        }
        await collection.update(doc.$key, { $synchronized: now })
      }
    }
    setTimeout(sync, 1000)
  }
  if (remotePath) sync()

  return collection
}