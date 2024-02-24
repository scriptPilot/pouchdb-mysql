import { prependKey, pouchToState } from './helper'

export default function get(key) {
  return new Promise((resolve, reject) => {
    key = prependKey(key, this.localPath)
    this.db.get(key)
      .then(doc => {
        doc = pouchToState(doc)
        resolve(doc.$deleted ? null : doc)
      })
      .catch(reject)
  })
}