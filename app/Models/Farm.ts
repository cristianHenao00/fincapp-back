import { DateTime } from 'luxon'
import { BaseModel, column,hasMany,HasMany ,hasOne,HasOne} from '@ioc:Adonis/Lucid/Orm'

import Order from './Order'

export default class Farm extends BaseModel {
  public static table = 'farms'
  @column({ isPrimary: true })
  public id: number

  @column()
  public idUser:number

  @column()
  public name:string;

  @column()
  public address:string;

  @column()
  public numberLicense:string;

  @column()
  public image:string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Order,{
    foreignKey: 'idFarm'
  })
  public orders: HasMany<typeof Order>


 
}
