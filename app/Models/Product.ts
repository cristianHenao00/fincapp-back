import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Farm from './Farm';
import Category from './Category';
import StockProduct from './StockProduct';

export default class Product extends BaseModel {
  public static table = 'products'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public idFarm: number

  @belongsTo(() => Farm, {
    foreignKey: 'idFarm',
  })
  public farm: BelongsTo<typeof Farm>

  @column()
  public idCategory: number

  @belongsTo(() => Category, {
    foreignKey: 'idCategory',
  })
  public category: BelongsTo<typeof Category>

  @hasMany(() => StockProduct, {
    foreignKey: 'idProduct',
  })
  public stockProducts: HasMany<typeof StockProduct>

}
