import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('permissions_roles', (table) => {
      table.boolean('activated').notNullable
    })
  }
}
