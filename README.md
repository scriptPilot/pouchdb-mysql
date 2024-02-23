# PouchDB + MySQL

> ⚠️ Development is ongoing - do not use in production

Local persistent database with optional synchronization to and from MySQL.

Powered by [PouchDB](https://pouchdb.com/) and [PHP CRUD API](https://github.com/mevdschee/php-crud-api).

## Installation

1. Install [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/)

2. Create a new app project:

    ```bash
    npm create vite
    ```

3. Add a PHP backend (optional, if synchronization is required):

    ```bash
    npx add-php-backend
    ```
    
4. Install the local database:

    ```bash
    npm install pouchdb-mysql
    ```

5. Create or complete the `vite.config.js` file:

    ```js
    export default {
      define: {
        global: {}
      }
    }
    ```
    
## SQL Schema
    
Required columns and primary key for SQL tables which should be synchronized:

```sql
CREATE TABLE `table` (
  `$key` varchar(36) NOT NULL,
  `$deleted` int(1) NOT NULL DEFAULT 0,
  `$updated` int(12) NOT NULL DEFAULT 0,
  `$sychronized` int(12) NOT NULL DEFAULT 0,
  ...,
  PRIMARY KEY (`$key`)
);
```

## Usage

### Import the module

```js
import useDB from 'pouchdb-mysql'
```

### Initialize a database

```js
// Initialize with default "database" name
const db = useDB()

// Initialize with custom database name
const db = useDB('customDatabase')
```

### Create collections

```js
// Local only
const collection = db.collection('collection')

// Local with full sync to and from remote
const collection = db.collection('collection', 'table')

// Local with full sync to and filtered sync from remote
const collection = db.collection('collection', 'table?filter=column,eq,something')

// Local with full sync to remote
const collection = db.collection('collection', 'to:table')

// Local with full sync from remote
const collection = db.collection('collection', 'from:table')

// Local with filtered sync from remote
const collection = db.collection('collection', 'from:table?filter=column,eq,something')
```

### Manage documents

```js
// Add a new doc with given $key or automatic UUIDv4 key
collection.add(docWithOrWithoutKey, (err, addedDoc) => {})

// Update a doc with given $key, will extend and overwrite existing doc
collection.update(docWithKey, (err, updatedDoc) => {})

// Replace a doc with given $key
collection.set(docWithKey, (err, updatedDoc) => {})

// Remove a doc with a given $key
collection.remove(keyOrDocWithKey, (err) => {})
```

### List documents

```js
// All documents with $key, callback on any change, returns state for React, Vue and Svelte
const docArray = collection.list((err, docsArray) => {})

// Like list() but with filter options
const docArray = collection.filter({ field: 'value', ... }, (err, docsArray) => {})

// Document with given key, {} if not found, callback on any change, returns state for React, Vue and Svelte
const doc = collection.get(key, (err, doc) => {})
```

### Manage authentication

For the API configuration, please refer to the [PHP CRUD API documentation](https://github.com/mevdschee/php-crud-api).

```js
// Register a new user
db.register(username, password, (err, userDetails) => {})

// Login an existing user
db.login(username, password, (err) => {})

// Get details for the current user
db.me((err, userDetails) => {})

// Change the password
db.password(username, password, newPassword, (err) => {})

// Logout
db.logout((err) => {})
```

## Development (this repository)

- Commit changes with an issue (closure) reference
- Run `npm version patch | minor | major` and push changes
- Let the workflow manage the release to GitHub and NPM
