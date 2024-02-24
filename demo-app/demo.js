import useDB from 'pouchdb-mysql'

(async () => {

  try {

    const db = useDB()    
    const tasks = db.collection('tasks', 'tasks')
    tasks.add({ title: (new Date()).toISOString() })
    tasks.list(docs => console.log('list', docs))

  } catch (err) {
    console.error(err)
  }

})()

