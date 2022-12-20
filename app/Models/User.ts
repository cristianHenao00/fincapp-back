import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  belongsTo,
  BelongsTo,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Rol from './Role'
import ApiToken from './ApiToken'
import Hash from '@ioc:Adonis/Core/Hash'
import Order from './Order'
import Farm from './Farm'
import Rating from './Rating'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public id_rol: number

  @belongsTo(() => Rol, {
    foreignKey: 'id_rol',
  })
  public role: BelongsTo<typeof Rol>

  @hasMany(() => ApiToken, {
    foreignKey: 'id_user',
  })
  public users: HasMany<typeof ApiToken>

  @hasOne(() => Farm, {
    foreignKey: 'id_user',
  })
  public farm: HasOne<typeof Farm>

  @hasMany(() => Order, {
    foreignKey: 'id_user',
  })
  public orders: HasMany<typeof Order>

  @manyToMany(() => Rating, {
    pivotTable: 'user_ratings',
    pivotForeignKey: 'id_user',
    pivotRelatedForeignKey: 'id_rating',
  })
  public ratings: ManyToMany<typeof Rating>

  @beforeSave()
  public static async hashPassword(theUser: User) {
    if (theUser.$dirty.password) {
      theUser.password = await Hash.make(theUser.password)
    }
  }
}
