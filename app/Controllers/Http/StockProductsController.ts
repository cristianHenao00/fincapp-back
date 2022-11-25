import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StockProduct from 'App/Models/StockProduct'

export default class StockProductsController {
  public async index(ctx: HttpContextContract) {
    return StockProduct.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newStockProduct = await StockProduct.create(body)
    return newStockProduct
  }

  public async show({ params }: HttpContextContract) {
    return StockProduct.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theStockProduct = await StockProduct.findOrFail(params.id)
    theStockProduct.value = body.value
    theStockProduct.amount = body.amount
    theStockProduct.published = body.published
    theStockProduct.visibility = body.visibility
    return theStockProduct.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theStockProduct = await StockProduct.findOrFail(params.id)
    return theStockProduct.delete()
  }

}
