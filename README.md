# PouchDB + MySQL

Local persistent database with optional synchronization to and from MySQL.

Powered by [PouchDB](https://pouchdb.com/) and [PHP CRUD API](https://github.com/mevdschee/php-crud-api).

## Installation

1. Install [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/)

2. Create a new app project:

    ```bash
    npm create vite
    ```

3. Add a PHP backend:

    ```bash
    npx add-php-backend
    ```
    
4. Install the local database:

    ```bash
    npm install pouchdb-mysql
    ```
    
## SQL Schema
    
Required columns and key for SQL tables which should be synchronized:

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

### Initialize the database

```js
import db from 'pouchdb-mysql'
or
import db from 'pouchdb-mysql/react'
or
import db from 'pouchdb-mysql/vue'
or
import db from 'pouchdb-mysql/svelte'
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
collection.addDoc(docWithOrWithoutKey, (err, addedDoc) => {})

// Update a doc with given $key
collection.updateDoc(docWithKey, (err, updatedDoc) => {})

// Remove a doc with a given $key
collection.removeDoc(keyOrDocWithKey, (err) => {})
```

### List documents
```js
// All documents with $key, updated on any change, returns state if possible
const state = collection.list((err, docsArray) => {})

// Like list() but with filter options
const state = collection.filter({ field: 'value', ... }, (err, docsArray) => {})
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