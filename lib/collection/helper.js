export function stateToPouch(stateDoc) {
  const doc = { ...stateDoc }
  doc._id = doc.$collection + '/' + doc.$key
  delete doc.$collection
  delete doc.$key
  return doc
}

export function pouchToState(pouchDoc) {
  const doc = { ...pouchDoc }
  doc.$collection = doc._id.split('/')[0]
  doc.$key = doc._id.replace(/^(.+)\//, '')
  Object.keys(doc).forEach(k => { if (k.startsWith('_')) delete doc[k] })
  return doc
}

export function stateToMySQL(stateDoc) {
  const doc = { ...stateDoc }
  doc.$synchronized = Date.now()
  delete doc.$table
  return doc
}