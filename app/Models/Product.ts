import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
<<<<<<< HEAD
import Farm from './Farm';
import Category from './Category';
import StockProduct from './StockProduct';
=======
import Farm from './Farm'
import Category from './Category'
import StockProduct from './StockProduct'
>>>>>>> main

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
<<<<<<< HEAD
  public idFarm: number

  @belongsTo(() => Farm, {
    foreignKey: 'idFarm',
=======
  public id_farm: number

  @belongsTo(() => Farm, {
    foreignKey: 'id_farm',
>>>>>>> main
  })
  public farm: BelongsTo<typeof Farm>

  @column()
<<<<<<< HEAD
  public idCategory: number

  @belongsTo(() => Category, {
    foreignKey: 'idCategory',
=======
  public id_category: number

  @belongsTo(() => Category, {
    foreignKey: 'id_category',
>>>>>>> main
  })
  public category: BelongsTo<typeof Category>

  @hasMany(() => StockProduct, {
<<<<<<< HEAD
    foreignKey: 'idProduct',
  })
  public stockProducts: HasMany<typeof StockProduct>

=======
    foreignKey: 'id_product',
  })
  public stockProducts: HasMany<typeof StockProduct>
>>>>>>> main
}
