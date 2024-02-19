export default {
  server: {
    proxy: {
      // eslint-disable-next-line no-useless-escape
      '^(.+)\\.php': 'http://localhost:8000/',
    },
  },}