import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'role_modules'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('index').notNullable()
      table.integer('id_module').unsigned().references('id').inTable('modules')
      table.integer('id_role').unsigned().references('id').inTable('roles')
      table.unique(['id_module', 'id_role'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
