# PouchDB + MySQL

Local persistent database with optional synchronization to and from MySQL.

Powered by [PouchDB](https://pouchdb.com/) and [PHP CRUD API](https://github.com/mevdschee/php-crud-api).

## Installation

1. Install [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/)

2. Create a new app project:

    ```bash
    npm create vite
    ```

3. Add a PHP backend

   Optional, for authentication and synchronization features.

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
CREATE TABLE `tableName` (
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
// Initialize with default database name and API endpoint
const db = useDB()

// Initialize with custom database name and default API endpoint
const db = useDB('customDatabaseName')

// Initialize with custom database name and API endpoint
const db = useDB('customDatabaseName', 'https://example.com/api.php')
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
const doc = await collection.add(docWithOrWithoutKey)

// Update a doc with given $key
const doc = await collection.update(docWithKey)

// Remove a doc with a given $key
await collection.remove(keyOrDocWithKey)
```

### List documents

```js
// List all documents
const docs = await collection.list()

// List all documents, including deleted documents
const docs = await collection.list(true)

// Like list() but with filter options
const docs = await collection.filter({ field: 'value' })

// Like list() but with filter options, including deleted documents
const docs = await collection.filter({ field: 'value' }, true)

// Document from a collection, callback on any change
const doc = await collection.get(key)
```

### Manage authentication

For the API configuration, please refer to the [PHP CRUD API documentation](https://github.com/mevdschee/php-crud-api).

```js
// Get details for the current user
const user = await db.me()

// Register a new user
const user = await db.register(username, password)

// Login an existing user
const user = await db.login(username, password)

// Change the password
const user = await db.password(username, password, newPassword)

// Logout
await db.logout()
```

## Development (this repository)

- Commit changes with an issue (closure) reference
- Run `npm version patch | minor | major` and push changes
- Let the workflow manage the release to GitHub and NPM
