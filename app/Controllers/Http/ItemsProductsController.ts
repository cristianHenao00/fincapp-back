import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ItemsProduct from 'App/Models/ItemsProduct'

export default class ItemsProductsController {
  //Lista todos los itemsProducts

  //Lista todos los itemsProducts

  public async index(ctx: HttpContextContract) {
<<<<<<< HEAD
    let itemsProducts: ItemsProduct[] = await
        ItemsProduct.query()
=======
    let itemsProducts: ItemsProduct[] = await ItemsProduct.query()
>>>>>>> main
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
<<<<<<< HEAD
    theItemsProduct.idStock = body.idStock
    theItemsProduct.idOrder = body.idOrder
=======
    theItemsProduct.id_stock = body.id_stock
    theItemsProduct.id_order = body.id_order
>>>>>>> main
    theItemsProduct.amount = body.amount
    return theItemsProduct.save()
  }

  //Elimina a un itemsProduct basado en el identificador

  public async destroy({ params }: HttpContextContract) {
    const theItemsProduct = await ItemsProduct.findOrFail(params.id)
    return theItemsProduct.delete()
  }
}
