import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.alterTable('farms', (table) => {

      table.integer('idUser').unsigned().references('users.id')

    })
  }


}
