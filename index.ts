import knex from 'knex/types/knex';

/**
 * create schemas(tables)
 * @param trx the transaction object
 * @param tables a map of table definitions, where key is the table name
 * */
export async function createSchemas(
  trx: knex,
  tables: Map<string, object>,
  schema = 'public'
) {
  for (const [tableName, model] of tables.entries()) {
    await trx.schema.withSchema(schema).createTable(tableName, t => {
      for (const field of Object.values(model)) {
        if (typeof field === 'function') {
          field(t, trx, schema);
        }
      }
    });
  }
}

/**
 * clear schemas(tables) under a schema
 * @param trx the transaction object
 * @param schema the schema to be cleared
 */
export async function clearSchemas(trx: knex, schema = 'public') {
  const { rows } = await trx.schema.raw(`
    select tablename from pg_tables where schemaname='${schema}'
  `);
  for (const { tablename } of rows) {
    await trx.schema.raw(`
      drop table if exists ${schema}.${tablename} cascade
    `);
  }
}
