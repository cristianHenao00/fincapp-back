import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('items_product', (table) => {
      table.integer('id_stock').unsigned().references('stock_product.id').onDelete('CASCADE')
      table.integer('id_order').unsigned().references('orders.id').onDelete('CASCADE')
    })
  }
}
