import { pouchToState } from './helper'

export default function get(key, showDeleted = false) {
  return new Promise((resolve, reject) => {
    this.db.get(this.localPath + '/' + key)
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