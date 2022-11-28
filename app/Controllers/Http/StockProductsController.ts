import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StockProduct from 'App/Models/StockProduct'

export default class StockProductsController {
<<<<<<< HEAD

  //Lista todos los stockProducts

  public async index(ctx: HttpContextContract) {
    let stockProducts: StockProduct[] = await
    StockProduct.query().preload('product').preload('orders')
=======
  //Lista todos los stockProducts

  public async index(ctx: HttpContextContract) {
    let stockProducts: StockProduct[] = await StockProduct.query()
      .preload('product')
      .preload('orders')
>>>>>>> main
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
<<<<<<< HEAD
    let theStockProduct = await
    StockProduct.query().where('id', params.id).preload('product')
=======
    let theStockProduct = await StockProduct.query().where('id', params.id).preload('product')
>>>>>>> main
    return theStockProduct
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
