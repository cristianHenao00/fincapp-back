import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


export default class ItemsProduct extends BaseModel {
<<<<<<< HEAD
  public static table = 'itemsProduct'
=======
  public static table = 'items_product'
>>>>>>> main

  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public id_stock: number

  @column()
  public id_order: number

  @column()
  public idStock: number

  @column()
  public idOrder: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
