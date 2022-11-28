import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Category extends BaseModel {
  public static table = 'categories'
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
<<<<<<< HEAD
    foreignKey: 'idCategory',
=======
    foreignKey: 'id_category',
>>>>>>> main
  })
  public products: HasMany<typeof Product>
}
