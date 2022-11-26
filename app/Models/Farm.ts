import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class Farm extends BaseModel {
  public static table = 'farms'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_user: number

  @column()
  public nombre: string

  @column()
  public address: string

  @column()
  public number_license: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'id_farm',
  })
  public products: HasMany<typeof Product>

  @hasMany(() => Order, {
    foreignKey: 'id_farm',
  })
  public orders: HasMany<typeof Order>
}
