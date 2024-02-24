export default function filter(filter, showDeleted) {
  return new Promise(async (resolve, reject) => {
    try {
      const list = await this.list(showDeleted)
      const filteredList = list.filter(doc => {
        let keep = true
        Object.keys(filter).forEach(k => {
          if (doc[k] !== filter[k]) keep = false
        })
        return keep === true
      })
      resolve(filteredList)
    } catch(error) {
      reject(error)
    }
  })
}