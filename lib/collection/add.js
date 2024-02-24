import { v4 as uuid } from 'uuid'
import { prependKey, stateToPouch } from './helper'

export default function add(doc) {
  return new Promise((resolve, reject) => {
    
    // Assign sync attributes
    doc.$key = prependKey(doc.$key || uuid(), this.localPath)
    doc.$deleted = 0
    doc.$updated = Date.now()
    doc.$synchronized = 0
    
    // Save to PouchDB
    this.db.put(stateToPouch(doc))
      .then(result => this.get(result.id))
      .then(resolve)
      .catch(error => reject(error))

  })
}