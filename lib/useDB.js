import PouchDB from 'pouchdb'
import useAPI from 'js-php-mysql-crud-api'
import upsert from 'pouchdb-upsert'
import collection from './collection'

PouchDB.plugin(upsert)

export default function useDB(databaseName = 'database', endpoint = '/api.php') {
  const db = new PouchDB(databaseName)
  const api = useAPI(endpoint)
  const watchers = []
  db.changes({ since: 'now', live: true })
    .on('change', change => {
      watchers.forEach(watcher => {
        if (change.id.startsWith(watcher.localPath)) watcher.onChangeCallback()
      })
    })
  return {
    db,
    api,
    watchers,
    collection,
    register: api.register,
    login: api.login,
    me: api.me,
    password: api.password,
    logout: api.logout
  }
}