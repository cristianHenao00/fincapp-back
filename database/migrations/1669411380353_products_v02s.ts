import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('products', (table) => {
      table.integer('id_farm').unsigned().references('farms.id').onDelete('CASCADE')
      table.integer('id_category').unsigned().references('categories.id').onDelete('CASCADE')
    })
  }
}
