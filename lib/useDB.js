import PouchDB from 'pouchdb'
import upsert from 'pouchdb-upsert'
import collection from './collection'

PouchDB.plugin(upsert)

export default function useDB(databaseName = 'database') {
  return {
    db: new PouchDB(databaseName),
    collection
  }
}