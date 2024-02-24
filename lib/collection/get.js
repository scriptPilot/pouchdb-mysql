import { prependKey, pouchToState } from './helper'

export default function get(key, showDeleted = false) {
  return new Promise((resolve, reject) => {
    key = prependKey(key, this.localPath)
    this.db.get(key)
      .then(doc => {
        doc = pouchToState(doc)
        if (showDeleted || doc.$deleted === 0) resolve(doc)
        else resolve(null)
      })
      .catch(error => {
        if (error.message === 'missing') resolve(null)
        else reject(error)
      })
  })
}