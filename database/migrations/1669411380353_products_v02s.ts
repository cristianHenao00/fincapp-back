import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('products', (table) => {
<<<<<<< HEAD
      table.integer('idFarm').unsigned().references('farms.id')
      table.integer('idCategory').unsigned().references('categories.id')
=======
      table.integer('id_farm').unsigned().references('farms.id').onDelete('CASCADE')
      table.integer('id_category').unsigned().references('categories.id').onDelete('CASCADE')
>>>>>>> main
    })
  }
}
