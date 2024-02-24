import { pouchToState } from './helper'

export default function list(onChangeCallback = null, showDeleted = false) {
  return new Promise((resolve, reject) => {
    this.db.allDocs({ include_docs: true })
      .then(result => {
        const docs = result.rows
          .map(row => row.doc)
          .map(doc => pouchToState(doc))
          .filter(doc => {
            return doc.$key.startsWith(`${this.localPath}/`)
          })
          .filter(doc => {
            return showDeleted === true || doc.$deleted === 0
          })
        if (onChangeCallback) onChangeCallback(docs)
        resolve(docs)
      })
      .catch(reject)
      .finally(() => {
        if (onChangeCallback) {
          this.watchers.push({
            localPath: this.localPath,
            onChangeCallback: async () => {
              const docs = await this.list(null, showDeleted)
              onChangeCallback(docs)
            }
          })
        }
      })
  })
}