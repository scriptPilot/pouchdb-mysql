import useDB from 'pouchdb-mysql'

(async () => {

  try {

    const db = useDB()
    console.log('database', db)

    const collection = db.collection('tasks')
    console.log('collection', collection)

    const doc = await collection.add({ key: 'value' })
    console.log('collection:add', doc)
    console.log('collection:update', await collection.update(doc.$key, { key: 'newValue' }))
    console.log('collection:remove', await collection.remove(doc.$key))
    console.log('collection:list', await collection.list(true))
    console.log('collection:filter', await collection.filter({ key: 'newValue' }))

    const username = (new Date()).toISOString()
    const password = 'topsecret123'
    
    console.log('register', await db.register(username, password))
    console.log('login', await db.login(username, password))
    console.log('password', await db.password(username, password, password+'new'))
    console.log('me', await db.me())
    console.log('logout', await db.logout())

  } catch (err) {
    console.error(err)
  }

})()

