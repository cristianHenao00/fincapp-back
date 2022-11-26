import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderState extends BaseModel {
  public static table = 'order_state'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_order: number

  @column()
  public id_state: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
