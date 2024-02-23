export default function get(key, callback = () => {}) {
  
  // Prepend collection path
  if (!key.startsWith(`${this.localPath}/`)) key = `${this.localPath}/${key}`
  
  // Get doc from the local database
  this.db.get(key)
    .then(localDBDoc => {

      // Map and cleanup localDBDoc > doc
      const doc = { ...localDBDoc, $key: localDBDoc._id }
      Object.keys(doc).forEach(k => { if (k.startsWith('_')) delete doc[k] })

      // Callback with doc
      callback(null, doc)

    })
    .catch(err => {
      callback(err)
    })

}