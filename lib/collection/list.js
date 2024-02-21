export default function list(callback = () => {}) {
  this.db.allDocs({ include_docs: true })
  .then(result => {
    const filteredDocs = result.rows.filter(doc => {
      return doc._deleted !== true && doc.id.startsWith(`${this.localPath}/`)
    }).map(doc => doc.doc)
    callback(null, filteredDocs)
  })
}