import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let permissions: Permission[] = await Permission.query().preload('roles')
    return permissions
  }
  /**
   * Almacena la información de un usuario
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newPermission: Permission = await Permission.create(body)
    return newPermission
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    return Permission.findOrFail(params.id)
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const thePermission: Permission = await Permission.findOrFail(params.id)
    thePermission.url = body.url
    thePermission.method = body.method
    return thePermission.save()
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const thePermission: Permission = await Permission.findOrFail(params.id)
    return thePermission.delete()
  }
}
