import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class Farm extends BaseModel {
  public static table = 'farms'
  @column({ isPrimary: true })
  public id: number

  @column()
<<<<<<< HEAD
  public idUser: number

  @column()
  public name: string
=======
  public id_user: number

  @column()
  public nombre: string
>>>>>>> main

  @column()
  public address: string

  @column()
<<<<<<< HEAD
  public numberLicense: string
=======
  public number_license: string
>>>>>>> main

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
<<<<<<< HEAD
    foreignKey: 'idFarm',
=======
    foreignKey: 'id_farm',
>>>>>>> main
  })
  public products: HasMany<typeof Product>

  @hasMany(() => Order, {
<<<<<<< HEAD
    foreignKey: 'idFarm',
=======
    foreignKey: 'id_farm',
>>>>>>> main
  })
  public orders: HasMany<typeof Order>
}
