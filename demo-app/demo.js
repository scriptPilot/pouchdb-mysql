import useDB from 'pouchdb-mysql'

(async () => {

  try {

    const db = useDB()    
    const tasks = db.collection('tasks', 'to:tasks')
    tasks.list(docs => console.log('list', docs), true)

    const doc = await tasks.add({ title: (new Date()).toISOString() })
    console.log('add', doc)
    setTimeout(async () => {
      console.log('update', await tasks.update(doc.$key, { done: 1 }))
      setTimeout(async () => {
        console.log('remove', await tasks.remove(doc.$key))
      }, 3000)
    }, 3000)    

  } catch (err) {
    console.error(err)
  }

})()

