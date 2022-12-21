import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
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

  public async farmer({ params }: HttpContextContract) {
    let theProducts = await Database.rawQuery(
      `select pf.*, c.name  as category_name from
      (select p.*, f.name as farm_name from products p join farms f
        on p.id_farm = f.id
        where f.id_user = ${params.id}) pf join categories c
        on pf.id_category = c.id`
    )
    if (!theProducts || !theProducts.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return theProducts.rows
  }

  //Actualiza la información de un producto basado
  //en el identificador y nuevos parámetros

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theProduct = await Product.findOrFail(params.id)
    theProduct.name = body.name
    theProduct.id_farm = body.id_farm
    theProduct.id_category = body.id_category
    return theProduct.save()
  }

  //Elimina a un usuario basado en el identificador

  public async destroy({ params }: HttpContextContract) {
    const theProduct = await Product.findOrFail(params.id)
    return theProduct.delete()
  }
}
