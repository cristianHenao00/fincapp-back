import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {

  public async up() {
    this.schema.alterTable('orderStates', (table) => {
      table.integer('idOrder').unsigned().references('orders.id').onDelete('CASCADE')
      table.integer('idState').unsigned().references('states.id').onDelete('CASCADE')
      table.unique(['idOrder', 'idState'])
    })
  }

}
