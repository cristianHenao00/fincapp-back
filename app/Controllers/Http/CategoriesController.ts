import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index(ctx: HttpContextContract) {
    return Category.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newCategory = await Category.create(body)
    return newCategory
  }

  public async show({ params }: HttpContextContract) {
    return Category.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theCategory = await Category.findOrFail(params.id)
    theCategory.name = body.name
    return theCategory.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theCategory = await Category.findOrFail(params.id)
    return theCategory.delete()
  }
}
