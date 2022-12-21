import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Farm from './Farm'

export default class Rating extends BaseModel {
  public static table = 'ratings'

  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public comment: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Farm, {
    foreignKey: 'id_farm',
  })
  public farms: HasMany<typeof Farm>

  @manyToMany(() => User, {
    pivotTable: 'user_ratings',
    pivotForeignKey: 'id_rating',
    pivotRelatedForeignKey: 'id_user',
  })
  public users: ManyToMany<typeof User>
}
