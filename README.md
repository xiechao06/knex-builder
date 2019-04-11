# knex-pg-builder [homepage](https:///xiechao06.github.io/knex-pg-builder)

[![npm](https://img.shields.io/npm/v/knex-pg-builder.svg?style=flat-square)](https://www.npmjs.org/package/knex-pg-builder)
[![The MIT License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/issues/xiechao06/knex-pg-builder.svg?style=flat-square)](https://github.com/xiechao06/knex-pg-builder/issues)
[![David](https://img.shields.io/david/xiechao06/knex-pg-builder.svg?style=flat-square)](https://david-dm.org/xiechao06/knex-pg-builder)
[![manpm](https://img.shields.io/badge/manpm-compatible-3399ff.svg)](https://github.com/bahmutov/manpm)
[![Type definitions](https://img.shields.io/npm/types/knex-pg-builder.svg)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Coverage Status](https://coveralls.io/repos/github/:userOrOrg/:repoName/badge.svg)](https://coveralls.io/github/xiechao06/knex-pg-builder)
[![Travis CI](https://img.shields.io/travis/:userOrOrg/:repoName.svg?style=flat-square)](https://travis-ci.ors/:userOrOrg/:repoName)


A small utility to automate the table creation for [knex](https://knexjs.org).

## Why? [![start with why](https://img.shields.io/badge/start%20with-why%3F-brightgreen.svg?style=flat)](http://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action)

I don't want to use ORMs like [bookshelf](https://bookshelfjs.org/), but I
still miss the one-command database build process.

## Installation

```bash
npm i -D knex-pg-builder
```

## Basic Usage

```javascript
const { createSchemas, clearSchemas } = require('knex-pg-builder');

db.transaction(async function (trx) {
  await createSchemas(trx, new Map([
    ['tableA', {
      id: t => t.increments(id),
      created_at: (t, trx) => t.datetime('create_at').defaultTo(trx.fn.now(6))
    }]
  ]))
})
```

check `__tests__/test.ts`

## [Docs](https:///xiechao06.github.io/knex-pg-builder)

## Tips

* why use Map instead of object?

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
