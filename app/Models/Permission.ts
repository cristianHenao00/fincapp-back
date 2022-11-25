import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Rol from './Role'

export default class Permission extends BaseModel {
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
    pivotTable: 'permissionsRoles',
    pivotForeignKey: 'idPermission',
    pivotRelatedForeignKey: 'idRol',
  })
  public roles: ManyToMany<typeof Rol>
}
