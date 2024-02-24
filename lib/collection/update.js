export default function update(key, updates = {}) {
  return new Promise(async (resolve, reject) => {
    this.db.upsert(this.localPath + '/' + key, doc => {
      return { ...doc, $synchronized: 0, $updated: Date.now(), ...updates }
    })
      .then(() => this.get(key))
      .then(resolve)
      .catch(error => reject(error))
  })
}