export default function remove(key) {
  return this.update(key, { $deleted: 1 })
}