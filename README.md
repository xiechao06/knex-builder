# knex-pg-builder
A small utility to automate the table creation for knex

# installation

```bash
$ npm i knex-pg-builder
```

# quick start

```javascript
const { createSchemas, clearSchemas } = require('knex-pg-builder')

db.transaction(async function (trx) {
  await createSchemas(trx, {
    tableA: {
      id: t => t.increments(id),
      created_at: (t, trx) => t.datetime('create_at').defaultTo(trx.fn.now(6))
    }
  })
})

```
