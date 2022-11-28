import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  //Lista todos los productos

  public async index(ctx: HttpContextContract) {
    let products: Product[] = await Product.query().preload('farm').preload('category')
    return products
  }

  // Almacena la información de un producto

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newProduct = await Product.create(body)
    return newProduct
  }

  // Muestra la información de un producto

  public async show({ params }: HttpContextContract) {
    let theProduct = await Product.query()
      .where('id', params.id)
      .preload('farm')
      .preload('category')
      .preload('stockProducts')
    return theProduct
  }

  //Actualiza la información de un producto basado
  //en el identificador y nuevos parámetros

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theProduct = await Product.findOrFail(params.id)
    theProduct.name = body.name
    theProduct.farm = body.farm
    theProduct.category = body.category
    return theProduct.save()
  }

  //Elimina a un usuario basado en el identificador

  public async destroy({ params }: HttpContextContract) {
    const theProduct = await Product.findOrFail(params.id)
    return theProduct.delete()
  }
}
