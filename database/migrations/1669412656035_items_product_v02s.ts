import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('itemsProduct', (table) => {
      table.integer('idStock').unsigned().references('stockProduct.id')
      table.integer('idOrder').unsigned().references('orders.id')
    })
  }
}
