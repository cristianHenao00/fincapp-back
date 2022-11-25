import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'


export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    return Product.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newProduct = await Product.create(body)
    return newProduct
  }

  public async show({ params }: HttpContextContract) {
    return Product.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theProduct = await Product.findOrFail(params.id)
    theProduct.name = body.name
    return theProduct.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theProduct = await Product.findOrFail(params.id)
    return theProduct.delete()
  }
}
