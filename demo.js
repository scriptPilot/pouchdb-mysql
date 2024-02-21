import useDB from './'

const db = useDB()
const collection = db.collection('collection')

collection.add({ key: 'value' }, (err, doc) => {
  console.log('collection:add', err, doc)
  collection.list((err, docs) => {
    console.log('collection:list', err, docs)
  })
})