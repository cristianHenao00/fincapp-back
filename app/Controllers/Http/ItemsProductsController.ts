import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemsProduct from 'App/Models/ItemsProduct'

export default class ItemsProductsController {

  public async index(ctx: HttpContextContract) {
    return ItemsProduct.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newItemsProduct = await ItemsProduct.create(body)
    return newItemsProduct
  }

  public async show({ params }: HttpContextContract) {
    return ItemsProduct.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theItemsProduct = await ItemsProduct.findOrFail(params.id)
    theItemsProduct.amount = body.amount
    return theItemsProduct.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theItemsProduct = await ItemsProduct.findOrFail(params.id)
    return theItemsProduct.delete()
  }


}
