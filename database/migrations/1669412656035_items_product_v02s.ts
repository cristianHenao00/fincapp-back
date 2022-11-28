import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
<<<<<<< HEAD
    this.schema.alterTable('itemsProduct', (table) => {
      table.integer('idStock').unsigned().references('stockProduct.id')
      table.integer('idOrder').unsigned().references('orders.id')
=======
    this.schema.alterTable('items_product', (table) => {
      table.integer('id_stock').unsigned().references('stock_product.id').onDelete('CASCADE')
      table.integer('id_order').unsigned().references('orders.id').onDelete('CASCADE')
>>>>>>> main
    })
  }
}
