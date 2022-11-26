import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm'
import Category from './Category'
import StockProduct from './StockProduct'

export default class Product extends BaseModel {
  public static table = 'products'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public id_farm: number

  @belongsTo(() => Farm, {
    foreignKey: 'id_farm',
  })
  public farm: BelongsTo<typeof Farm>

  @column()
  public id_category: number

  @belongsTo(() => Category, {
    foreignKey: 'id_category',
  })
  public category: BelongsTo<typeof Category>

  @hasMany(() => StockProduct, {
    foreignKey: 'id_product',
  })
  public stockProducts: HasMany<typeof StockProduct>
}
