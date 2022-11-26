import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionRol from 'App/Models/PermissionRol'

export default class PermissionsRolesController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let permissionRoles: PermissionRol[] = await PermissionRol.query()
    return permissionRoles
  }
  /**
   * Almacena la información de un usuario
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newPermissionRole: PermissionRol = await PermissionRol.create(body)
    return newPermissionRole
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    return PermissionRol.findOrFail(params.id)
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    thePermissionRole.id_rol = body.id_rol
    thePermissionRole.id_permission = body.id_permission
    return thePermissionRole.save()
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    return thePermissionRole.delete()
  }
}
