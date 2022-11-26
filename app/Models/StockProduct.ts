import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product';
import Order from './Order';

export default class StockProduct extends BaseModel {
  public static table = 'stockProduct'

  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number;

  @column()
  public amount: number;

  @column()
  public published: Date;

  @column()
  public visibility: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public idProduct: number

  @belongsTo(() => Product, {
    foreignKey: 'idProduct',
  })
  public product: BelongsTo<typeof Product>

  @manyToMany(() => Order, {
    pivotTable: 'itemsProduct',
    pivotForeignKey: 'idStock',
    pivotRelatedForeignKey:'idOrder'
    })
    public orders: ManyToMany<typeof Order>

}
