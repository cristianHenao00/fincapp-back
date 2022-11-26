import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Role'
import Farm from './Farm'
import Order from './Order'

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

  @hasOne(() => Farm,{
    foreignKey: 'idUser'
  })
  public farm: HasOne<typeof Farm>


  @hasMany(() => Order,{
    foreignKey: 'idUser'
  })
  public orders: HasMany<typeof Order>

  
}
