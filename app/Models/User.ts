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
} from '@ioc:Adonis/Lucid/Orm'
import Rol from './Role'
import ApiToken from './ApiToken'
import Hash from '@ioc:Adonis/Core/Hash'
import Order from './Order'
import Farm from './Farm'

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
  public idRol: number

  @belongsTo(() => Rol, {
    foreignKey: 'idRol',
  })
  public role: BelongsTo<typeof Rol>

  @hasMany(() => ApiToken, {
    foreignKey: 'idUser',
  })
  public users: HasMany<typeof ApiToken>

  @hasOne(() => Farm, {
    foreignKey: 'idUser',
  })
  public farm: HasOne<typeof Farm>

  @hasMany(() => Order, {
    foreignKey: 'idUser',
  })
  public orders: HasMany<typeof Order>

  @beforeSave()
  public static async hashPassword(theUser: User) {
    if (theUser.$dirty.password) {
      theUser.password = await Hash.make(theUser.password)
    }
  }
}
