export default function update(doc, callback = () => {}) {

  // Map and cleanup doc > localDBDoc
  const localDBDoc = { ...doc, _id: doc.$key }
  delete localDBDoc.$key
  
  // Update in PouchDB
  this.db.upsert(localDBDoc._id, () => localDBDoc)
    .then(result => {
      if (result.updated) callback(null, doc)
      else callback(new Error('Failed to update the doc'))
    })
    .catch(err => {
      callback(err)
    })

}