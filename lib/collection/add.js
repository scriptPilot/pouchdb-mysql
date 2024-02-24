import { v4 as uuid } from 'uuid'
import { stateToPouch } from './helper'

export default function add(doc) {
  return new Promise((resolve, reject) => {
    
    // Assign sync attributes
    doc.$collection = this.localPath
    doc.$key = doc.$key || uuid()
    doc.$deleted = 0
    doc.$synchronized = 0
    doc.$updated = Date.now()
    
    // Save to PouchDB
    this.db.put(stateToPouch(doc))
      .then(() => this.get(doc.$key))
      .then(resolve)
      .catch(error => reject(error))

  })
}