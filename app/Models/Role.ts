import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Permission from './Permission'

export default class Rol extends BaseModel {
  public static table = 'roles'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'idRol',
  })
  public users: HasMany<typeof User>

  @manyToMany(() => Permission, {
    pivotTable: 'permissionsRoles',
    pivotForeignKey: 'idRol',
    pivotRelatedForeignKey: 'idPermission',
  })
  public permissions: ManyToMany<typeof Permission>
}
