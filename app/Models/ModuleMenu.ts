import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ModuleMenu extends BaseModel {
  public static table = 'module_menus'
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_module: number

  @column()
  public id_menu: number

  @column()
  public index: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
