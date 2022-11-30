import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Menu from './Menu'
import Rol from './Role'

export default class Module extends BaseModel {
  public static table = 'modules'
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public path: string

  @column()
  public icon: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Menu, {
    pivotTable: 'module_menus',
    pivotForeignKey: 'id_module',
    pivotRelatedForeignKey: 'id_menu',
  })
  public menus: ManyToMany<typeof Menu>

  @manyToMany(() => Rol, {
    pivotTable: 'role_modules',
    pivotForeignKey: 'id_module',
    pivotRelatedForeignKey: 'id_role',
  })
  public roles: ManyToMany<typeof Rol>
}
