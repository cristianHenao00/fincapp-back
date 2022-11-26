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
  public id_user: number

  @column()
  public id_farm: number

  @column()
  public date_order: string

  @column()
  public state: boolean

  @column()
  public service_cost: number

  @column()
  public shipping_cost: number

  @column()
  public service_fee: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => StockProduct, {
    pivotTable: 'items_product',
    pivotForeignKey: 'id_order',
    pivotRelatedForeignKey: 'id_stock',
  })
  public stockProducts: ManyToMany<typeof StockProduct>

  @belongsTo(() => User, {
    foreignKey: 'id_user',
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Farm, {
    foreignKey: 'id_farm',
  })
  public farm: BelongsTo<typeof Farm>
}
