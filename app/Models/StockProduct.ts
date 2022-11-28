import { DateTime } from 'luxon'
<<<<<<< HEAD
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import Order from './Order';

export default class StockProduct extends BaseModel {
  public static table = 'stockProduct'
=======
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
>>>>>>> main

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
<<<<<<< HEAD
  public idProduct: number

  @belongsTo(() => Product, {
    foreignKey: 'idProduct',
=======
  public id_product: number

  @belongsTo(() => Product, {
    foreignKey: 'id_product',
>>>>>>> main
  })
  public product: BelongsTo<typeof Product>

  @manyToMany(() => Order, {
<<<<<<< HEAD
    pivotTable: 'itemsProduct',
    pivotForeignKey: 'idStock',
    pivotRelatedForeignKey:'idOrder'
    })
    public orders: ManyToMany<typeof Order>

=======
    pivotTable: 'items_product',
    pivotForeignKey: 'id_stock',
    pivotRelatedForeignKey: 'id_order',
  })
  public orders: ManyToMany<typeof Order>
>>>>>>> main
}
