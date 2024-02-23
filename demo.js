import useDB from './'

const db = useDB()
const collection = db.collection('collection')

collection.add({ key: 'value' }, (err, doc) => {
  console.log('collection:add', err, doc)
  collection.update({ ...doc, key: 'newValue' }, (err, doc) => {
    console.log('collection:update', err, doc)
    collection.get(doc.$key, (err, doc) => {
      console.log('collection:get', err, doc)
      collection.list((err, docs) => {
        console.log('collection:list', err, docs)
      })
    })
  })
})