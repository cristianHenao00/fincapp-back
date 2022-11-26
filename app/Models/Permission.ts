import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Role'

export default class Permission extends BaseModel {
  public static table = 'permissions'

  @column({ isPrimary: true })
  public id: number

  @column()
  public url: string

  @column()
  public method: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Rol, {
    pivotTable: 'permissions_roles',
    pivotForeignKey: 'id_permission',
    pivotRelatedForeignKey: 'id_rol',
  })
  public roles: ManyToMany<typeof Rol>
}
