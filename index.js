module.exports = {
  /**
   * create schemas
   *
   * @param {Map} tables a map of table definitions, where key is the table name
   * */
  async createSchemas (trx, tables, schema = 'public') {
    for (let [tableName, model] of tables) {
      await trx.schema.withSchema(schema).createTable(tableName, t => {
        for (let field of Object.values(model)) {
          if (typeof field === 'function') {
            field(t, trx, schema)
          }
        }
      })
    }
  },
  async clearSchemas (trx, schema = 'public') {
    let { rows } = await trx.schema.raw(`
      select tablename from pg_tables where schemaname='${schema}'
    `)
    for (let { tablename } of rows) {
      await trx.schema.raw(`
        drop table if exists ${schema}.${tablename} cascade
      `)
    }
  }
}
