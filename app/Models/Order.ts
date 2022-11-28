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
<<<<<<< HEAD
  public idUser: number

  @column()
  public idFarm: number

  @column()
  public dateOrder: string
=======
  public id_user: number

  @column()
  public id_farm: number

  @column()
  public date_order: string
>>>>>>> main

  @column()
  public state: boolean

  @column()
<<<<<<< HEAD
  public serviceCost: number

  @column()
  public shippingCost: number

  @column()
  public serviceFee: number
=======
  public service_cost: number

  @column()
  public shipping_cost: number

  @column()
  public service_fee: number
>>>>>>> main

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => StockProduct, {
<<<<<<< HEAD
    pivotTable: 'itemsProduct',
    pivotForeignKey: 'idOrder',
    pivotRelatedForeignKey: 'idStock',
  })
  public stockProducts: ManyToMany<typeof StockProduct>
  @belongsTo(() => User, {
    foreignKey: 'idUser',
=======
    pivotTable: 'items_product',
    pivotForeignKey: 'id_order',
    pivotRelatedForeignKey: 'id_stock',
  })
  public stockProducts: ManyToMany<typeof StockProduct>

  @belongsTo(() => User, {
    foreignKey: 'id_user',
>>>>>>> main
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Farm, {
<<<<<<< HEAD
    foreignKey: 'idFarm',
=======
    foreignKey: 'id_farm',
>>>>>>> main
  })
  public farm: BelongsTo<typeof Farm>
}
