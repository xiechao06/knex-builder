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
  await createSchemas(trx, new Map([
    ['tableA', {
      id: t => t.increments(id),
      created_at: (t, trx) => t.datetime('create_at').defaultTo(trx.fn.now(6))
    }]
  ]))
})

```

# why use Map instead of object?

When a table A has a reference to another table B, table A must be created after
tableB, but `object.keys` doesn't ensure the order, eg.

```javascript
object.keys({ a: 1, b: 2 }) // may be ['a', 'b'] or ['b', 'a']
```

but Map will keep the same order when items are set, eg.

```javascript
var m = new Map()
m.set('a', 1)
m.set('b', 2)

Array.from(m) // generate [['a', 1], ['b', 1]]
```
