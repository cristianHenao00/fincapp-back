import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up () {
    this.schema.alterTable('orders', (table) => {
      table.integer('idUser').unsigned().references('users.id')
      table.integer('idFarm').unsigned().references('farms.id')
      
    })
  }


}
