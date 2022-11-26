import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PermissionRol extends BaseModel {
<<<<<<< HEAD
<<<<<<< HEAD
  public static table = 'permissionsRoles'

=======
>>>>>>> main
=======

  public static table = 'permissionsRoles'

>>>>>>> 784c24a6638dd9fc1c74cad4302e06c52a65f9e6
  @column({ isPrimary: true })
  public id: number

  @column()
  public idRol: number

  @column()
  public idPermission: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
