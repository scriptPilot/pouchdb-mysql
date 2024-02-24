export function stateToPouch(doc) {
  doc._id = doc.$key
  delete doc.$key
  return doc
}

export function pouchToState(doc) {
  doc.$key = doc._id
  Object.keys(doc).forEach(k => { if (k.startsWith('_')) delete doc[k] })
  return doc
}

export function prependKey(key, path) {
  return key.startsWith(`${path}/`) ? key : `${path}/${key}`
}