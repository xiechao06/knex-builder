import * as Knex from 'knex';
import { createSchemas, clearSchemas } from '../index';

let db;

const SCHEMA = 'my_schema';

beforeAll(() => {
  db = Knex({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
    debug: true
  });
});

afterAll(() => {
  db.destroy();
});

beforeEach(async () => {
  await db.schema.raw(`create schema if not exists ${SCHEMA}`);
  await db.schema.raw(`drop table if exists ${SCHEMA}.user cascade`);
  const tables = new Map();
  tables.set('user', {
    id: t => t.increments('id'),
    name: t =>
      t
        .string('name')
        .unique()
        .notNullable()
  });
  await createSchemas(db, tables, SCHEMA);
});

test('createSchemas', async () => {
  const [{ count }] = await db('pg_tables')
    .withSchema('pg_catalog')
    .where({
      schemaname: SCHEMA,
      tablename: 'user'
    })
    .count();
  expect(Number(count)).toBe(1);
  const cols = await db('columns')
    .withSchema('information_schema')
    .where({
      table_schema: SCHEMA,
      table_name: 'user'
    });
  expect(cols.length).toEqual(2);
  expect(cols.map(it => it.column_name)).toEqual(['id', 'name']);
});

test('clearSchemas', async () => {
  await clearSchemas(db, SCHEMA);
  const [{ count }] = await db('pg_tables')
    .withSchema('pg_catalog')
    .where({
      schemaname: SCHEMA,
      tablename: 'user'
    })
    .count();
  expect(Number(count)).toEqual(0);
  const cols = await db('columns')
    .withSchema('information_schema')
    .where({
      table_schema: SCHEMA,
      table_name: 'user'
    });
  expect(cols.length).toEqual(0);
});
