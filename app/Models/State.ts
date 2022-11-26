import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'

export default class State extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Order, {
    pivotTable: 'order_states',
    pivotForeignKey: 'id_state',
    pivotRelatedForeignKey: 'id_orders',
  })
  public orders: ManyToMany<typeof Order>
}
