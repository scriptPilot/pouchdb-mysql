import PouchDB from 'pouchdb'
import useAPI from 'js-php-mysql-crud-api'
import upsert from 'pouchdb-upsert'
import collection from './collection'

PouchDB.plugin(upsert)

export default function useDB(databaseName = 'database', endpoint = '/api.php') {
  const db = new PouchDB(databaseName)
  const api = useAPI(endpoint)
  return {
    db,
    api,
    collection,
    register: api.register,
    login: api.login,
    me: api.me,
    password: api.password,
    logout: api.logout
  }
}