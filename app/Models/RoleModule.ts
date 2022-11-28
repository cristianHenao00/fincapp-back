import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RoleModule extends BaseModel {
  public static table = 'role_modules'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_module: number

  @column()
  public id_role: number

  @column()
  public index: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
