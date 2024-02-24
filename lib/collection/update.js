export default function update(key, updates = {}) {
  return new Promise(async (resolve, reject) => {
    this.db.upsert(key, doc => {
      return { ...doc, $updated: Date.now(), $synchronized: 0, ...updates }
    })
      .then(result => this.get(result.id))
      .then(resolve)
      .catch(error => reject(error))
  })
}