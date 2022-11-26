import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('order_states', (table) => {
      table.integer('id_order').unsigned().references('orders.id').onDelete('CASCADE')
      table.integer('id_state').unsigned().references('states.id').onDelete('CASCADE')
      table.unique(['id_order', 'id_state'])
    })
  }
}
