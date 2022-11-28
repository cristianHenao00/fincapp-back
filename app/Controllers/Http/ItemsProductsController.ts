import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemsProduct from 'App/Models/ItemsProduct'

export default class ItemsProductsController {
  //Lista todos los itemsProducts

  //Lista todos los itemsProducts

  public async index(ctx: HttpContextContract) {
    let itemsProducts: ItemsProduct[] = await ItemsProduct.query()
    return itemsProducts
  }

  // Almacena la información de un itemsProduct

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newItemsProduct = await ItemsProduct.create(body)
    return newItemsProduct
  }

  // Muestra la información de un itemsProduct

  public async show({ params }: HttpContextContract) {
    return ItemsProduct.findOrFail(params.id)
  }

  //Actualiza la información de un itemsProduct basado
  //en el identificador y nuevos parámetros

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theItemsProduct = await ItemsProduct.findOrFail(params.id)
    theItemsProduct.id_stock = body.id_stock
    theItemsProduct.id_order = body.id_order
    theItemsProduct.amount = body.amount
    return theItemsProduct.save()
  }

  //Elimina a un itemsProduct basado en el identificador

  public async destroy({ params }: HttpContextContract) {
    const theItemsProduct = await ItemsProduct.findOrFail(params.id)
    return theItemsProduct.delete()
  }
}
