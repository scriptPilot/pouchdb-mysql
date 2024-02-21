import PouchDB from 'pouchdb'
import collection from './collection'

export default function useDB(databaseName = 'database') {
  return {
    db: new PouchDB(databaseName),
    collection
  }
}