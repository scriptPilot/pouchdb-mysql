import { v4 as uuid } from 'uuid'

export default function add(doc, callback = () => {}) {

  // Define $key (support falsely assigned _id attribute)
  doc.$key = doc.$key || doc._id || uuid()

  // Cleanup existing _id attribute (support falsely assigned _id attribute)
  if (doc._id) delete doc._id
  
  // Prepend collection path
  if (!doc.$key.startsWith(`${this.localPath}/`)) doc.$key = `${this.localPath}/${doc.$key}`

  // Map and cleanup doc > localDBDoc
  const localDBDoc = { ...doc, _id: doc.$key }
  delete localDBDoc.$key
  
  // Save to PouchDB
  this.db.put(localDBDoc)
    .then(result => {
      if (result.ok) callback(null, doc)
      else callback(new Error('Failed to put the doc'))
    })
    .catch(err => {
      callback(err)
    })

}