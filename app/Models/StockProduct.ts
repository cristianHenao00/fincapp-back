import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StockProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number;

  @column()
  public amount: number;

  @column()
  public published: Date;

  @column()
  public visibility: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
