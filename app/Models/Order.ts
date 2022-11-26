import { DateTime } from 'luxon'
import StockProduct from './StockProduct'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Farm from './Farm'

export default class Order extends BaseModel {
  public static table = 'orders'
  @column({ isPrimary: true })
  public id: number

  @column()
  public idUser: number

  @column()
  public idFarm: number

  @column()
  public dateOrder: string

  @column()
  public state: boolean

  @column()
  public serviceCost: number

  @column()
  public shippingCost: number

  @column()
  public serviceFee: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => StockProduct, {
    pivotTable: 'itemsProduct',
    pivotForeignKey: 'idOrder',
    pivotRelatedForeignKey: 'idStock',
  })
  public stockProducts: ManyToMany<typeof StockProduct>
  @belongsTo(() => User, {
    foreignKey: 'idUser',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Farm, {
    foreignKey: 'idFarm',
  })
  public farm: BelongsTo<typeof Farm>
}
