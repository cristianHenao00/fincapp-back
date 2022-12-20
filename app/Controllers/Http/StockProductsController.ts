import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import StockProduct from 'App/Models/StockProduct'

export default class StockProductsController {
  //Lista todos los stockProducts

  public async index(ctx: HttpContextContract) {
    let stockProducts: StockProduct[] = await StockProduct.query()
      .preload('product')
      .preload('orders')
    return stockProducts
  }

  // Almacena la información de un stockProduct

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newStockProduct = await StockProduct.create(body)
    return newStockProduct
  }

  // Muestra la información de un stockProduct

  public async show({ params }: HttpContextContract) {
    let theStockProduct = await StockProduct.query().where('id', params.id).preload('product')
    return theStockProduct
  }

  public async farmer({ params }: HttpContextContract) {
    let theStockProducts = await Database.rawQuery(
      `select sp.*, pf.name as product_name, pf.farm_name from
      (select p.*, f.name as farm_name  from products p join farms f
        on p.id_farm = f.id
        where f.id_user = ${params.id}) pf join stock_product sp
         on sp.id_product  = pf.id`
    )
    if (!theStockProducts || !theStockProducts.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return theStockProducts.rows
  }

  //Actualiza la información de un stockProduct basado
  //en el identificador y nuevos parámetros

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theStockProduct = await StockProduct.findOrFail(params.id)
    theStockProduct.value = body.value
    theStockProduct.amount = body.amount
    theStockProduct.published = body.published
    theStockProduct.visibility = body.visibility
    theStockProduct.product = body.product
    return theStockProduct.save()
  }

  //Elimina a un stockProduct basado en el identificador

  public async destroy({ params }: HttpContextContract) {
    const theStockProduct = await StockProduct.findOrFail(params.id)
    return theStockProduct.delete()
  }
}
