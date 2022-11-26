import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('products', (table) => {
      table.integer('idFarm').unsigned().references('farms.id')
      table.integer('idCategory').unsigned().references('categories.id')
    })
  }
}
