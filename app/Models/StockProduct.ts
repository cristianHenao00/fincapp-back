import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Order from './Order'

export default class StockProduct extends BaseModel {
  public static table = 'stock_product'

  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public amount: number

  @column()
  public published: Date

  @column()
  public visibility: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public id_product: number

  @belongsTo(() => Product, {
    foreignKey: 'id_product',
  })
  public product: BelongsTo<typeof Product>

  @manyToMany(() => Order, {
    pivotTable: 'items_product',
    pivotForeignKey: 'id_stock',
    pivotRelatedForeignKey: 'id_order',
  })
  public orders: ManyToMany<typeof Order>
}
