import { v4 as uuid } from 'uuid'

export default function add(doc, callback = () => {}) {

  // Use UUID id no id is provided
  if (!doc._id) doc._id = uuid()

  // Prepend collection path
  if (!doc._id.startsWith(`${this.localPath}/`)) doc._id = `${this.localPath}/${doc._id}`

  // Save to PouchDB
  this.db.put(doc)
  .then(result => {
    if (result.ok) callback(null, doc)
    else callback(new Error('Failed to put the doc'))
  })
  .catch(err => {
    callback(err)
  })

}