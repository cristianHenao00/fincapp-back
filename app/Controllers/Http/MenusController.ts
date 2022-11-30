import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Menu from 'App/Models/Menu'

export default class MenusController {
  public async index(ctx: HttpContextContract) {
    let menus: Menu[] = await Menu.query()
    return menus
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newMenu: Menu = await Menu.create(body)
    return newMenu.save()
  }

  public async show({ params }: HttpContextContract) {
    return Menu.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theMenu: Menu = await Menu.findOrFail(params.id)
    theMenu.name = body.name
    return theMenu.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theMenu: Menu = await Menu.findOrFail(params.id)
    return theMenu.delete()
  }
}
