import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ratings'

  public async up() {
    this.schema.alterTable('ratings', (table) => {
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }
}
