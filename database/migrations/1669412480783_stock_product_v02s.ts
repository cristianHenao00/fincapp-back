import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
<<<<<<< HEAD
    this.schema.alterTable('stockProduct', (table) => {
      table.integer('idProduct').unsigned().references('products.id')
=======
    this.schema.alterTable('stock_product', (table) => {
      table.integer('id_product').unsigned().references('products.id').onDelete('CASCADE')
>>>>>>> main
    })
  }
}
