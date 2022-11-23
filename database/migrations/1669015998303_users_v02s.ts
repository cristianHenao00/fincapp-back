import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('users', (table) => {
      table.integer('idRol').unsigned().references('roles.id')
    })
  }
}
