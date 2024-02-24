export function stateToPouch(originalDoc) {
  const doc = { ...originalDoc }
  doc._id = doc.$key
  delete doc.$key
  return doc
}

export function pouchToState(originalDoc) {
  const doc = { ...originalDoc }
  doc.$key = doc._id
  Object.keys(doc).forEach(k => { if (k.startsWith('_')) delete doc[k] })
  return doc
}

export function stateToMySQL(originalDoc) {
  const doc = { ...originalDoc }
  doc.$key = doc.$key.replace(/^(.+)\/(.+)$/, '$2')
  delete doc.$synchronized
  return doc
}

export function prependKey(key, path) {
  return key.startsWith(`${path}/`) ? key : `${path}/${key}`
}