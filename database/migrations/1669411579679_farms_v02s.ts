import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('farms', (table) => {
      table.integer('id_user').unsigned().references('users.id').onDelete('CASCADE')
    })
  }
}
