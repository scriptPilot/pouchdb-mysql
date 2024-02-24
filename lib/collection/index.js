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
  async function sync() { 
    
    // Synchronization from remote to local
    if (!collection.remotePath.startsWith('to:')) {
      
      // Get last sync timestamp
      const localStorageKey = `sync > ${remotePath} > ${localPath}`
      let lastSync = parseInt(window.localStorage.getItem(localStorageKey) || 0)

      // Get updated documents from remote
      const updatedFilter = 'filter1=$updated,gt,' + lastSync + '&filter2=$synchronized,gt,' + lastSync
      const deletedFilter = lastSync === 0 ? '&filter=$deleted,eq,0' : ''
      const baseRemotePath = remotePath + (remotePath.indexOf('?') === -1 ? '?' : '&')
      const docs = await collection.api.list(baseRemotePath + updatedFilter + deletedFilter)
      
      // Loop remote docs
      for (const doc of docs) {
        
        // Get lexisting local doc from PouchDB
        const localDoc = await collection.get(doc.$key)
        console.log(doc, localDoc)

      }

    }

    // Synchronization from local to remote
    if (!collection.remotePath.startsWith('from:')) {

      // Loop all not yet synchronized documents
      const docs = (await collection.list(null, true)).filter(d => !d.$synchronized)
      for (const doc of docs) {   

        // Get table and MySQL doc
        const table = doc.$collection
        const mySQLDoc = stateToMySQL(doc)

        // Get existing remote doc from MySQL
        const existingDocs = await collection.api.list(`${table}?filter=$key,eq,${mySQLDoc.$key}`)

        // Remote doc exists
        if (existingDocs.length) {

          // Remote doc is older > update
          if (existingDocs[0].$updated < mySQLDoc.$updated) {
            console.log('update remote', await collection.api.update(table, mySQLDoc.$key, mySQLDoc))
          }

        // Remote doc not exists
        } else {

          // Create remote doc
          console.log('create remote', await collection.api.create(table, mySQLDoc))

        }

        // Mark local doc as synchronized, keep last update
        await collection.update(doc.$key, { $synchronized: mySQLDoc.$synchronized, $updated: mySQLDoc.$updated })

      }
    }

    // Run synchronization every x seconds
    setTimeout(sync, 1 * 1000)

  }
  if (remotePath) sync()

  return collection
}