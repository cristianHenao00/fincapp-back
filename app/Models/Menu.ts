import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Module from './Module'

export default class Menu extends BaseModel {
  public static table = 'menus'

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

  @column()
  public read_action: boolean

  @column()
  public create_action: boolean

  @column()
  public update_action: boolean

  @column()
  public delete_action: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Module, {
    pivotTable: 'module_menus',
    pivotForeignKey: 'id_menu',
    pivotRelatedForeignKey: 'id_module',
  })
  public modules: ManyToMany<typeof Module>
}
