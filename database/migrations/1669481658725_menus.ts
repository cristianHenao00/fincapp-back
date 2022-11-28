import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 60).notNullable()
      table.string('description', 255).notNullable()
      table.string('path', 60).notNullable()
      table.string('icon', 60)
      table.boolean('read_action').defaultTo(false)
      table.boolean('create_action').defaultTo(false)
      table.boolean('update_action').defaultTo(false)
      table.boolean('delete_action').defaultTo(false)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
