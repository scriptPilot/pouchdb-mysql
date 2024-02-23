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

5. Create or extend the `vite.config.js` file:

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
// Initialize with default database name "database"
const db = useDB()

// Initialize with custom database name
const db = useDB('customDatabaseName')
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
collection.add(docWithOrWithoutKey, onSuccess(doc), onError(error))

// Update a doc with given $key, will extend and overwrite existing doc
collection.update(docWithKey, onSuccess(doc), onError(error))

// Replace a doc with given $key
collection.set(docWithKey, onSuccess(doc), onError(error))

// Remove a doc with a given $key
collection.remove(keyOrDocWithKey, onError(error))
```

### List documents

```js
// List all documents, callback on any change
const docs = collection.list(onChange(docs), onError(error))

// Like list() but with filter options
const docs = collection.filter({ field: 'value' }, onChange(docs), onError(error))

// Document from a collection, callback on any change
const doc = collection.get(key, onChange(doc), onError(error))
```

### Manage authentication

For the API configuration, please refer to the [PHP CRUD API documentation](https://github.com/mevdschee/php-crud-api).

```js
// Register a new user
db.register(username, password, onSuccess(user), onError(error))

// Login an existing user
db.login(username, password, onSuccess(user), onError(error))

// Get details for the current user
db.me(onSuccess(user), onError(error))

// Change the password
db.password(username, password, newPassword, onSuccess(), onError(error))

// Logout
db.logout(onSuccess(), onError(error))
```

## Development (this repository)

- Commit changes with an issue (closure) reference
- Run `npm version patch | minor | major` and push changes
- Let the workflow manage the release to GitHub and NPM
