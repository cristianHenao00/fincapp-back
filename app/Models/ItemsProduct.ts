import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class ItemsProduct extends BaseModel {
  public static table = 'itemsProduct'

  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number;

  @column()
  public idStock: number

  @column()
  public idOrder: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
