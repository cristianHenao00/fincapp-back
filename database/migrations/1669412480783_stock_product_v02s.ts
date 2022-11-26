import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('stockProduct', (table) => {
      table.integer('idProduct').unsigned().references('products.id')
    })
  }
}
