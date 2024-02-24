import { v4 as uuid } from 'uuid'
import { stateToPouch } from './helper'

export default function add(doc) {
  return new Promise((resolve, reject) => {

    // Create doc with defaults, overwrite with given doc
    doc = {
      $collection: this.localPath,
      $key: uuid(),
      $deleted: 0,
      $synchronized: 0,
      $updated: Date.now(),
      ...doc
    }
    
    // Save to PouchDB
    this.db.put(stateToPouch(doc))
      .then(() => this.get(doc.$key))
      .then(resolve)
      .catch(error => reject(error))

  })
}