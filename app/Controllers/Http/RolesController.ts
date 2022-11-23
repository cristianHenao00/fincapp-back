import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
  public async index(ctx: HttpContextContract) {
    return Role.all()
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newRole = await Role.create(body)
    return newRole
  }

  public async show({ params }: HttpContextContract) {
    return Role.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theRole = await Role.findOrFail(params.id)
    theRole.name = body.name
    return theRole.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theRole = await Role.findOrFail(params.id)
    return theRole.delete()
  }
}
