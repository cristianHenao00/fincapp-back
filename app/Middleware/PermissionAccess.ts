import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import PermissionRol from 'App/Models/PermissionRol'

export default class ClienteAccess {
  public async handle({ auth, request, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      const method = request.method()
      const url = request.url().replace(/[\d]/, '?')
      const thePermission = await Permission.query()
        .whereIn(['url', 'method'], [[url, method]])
        .firstOrFail()
      const thePermissionRole = await PermissionRol.query()
        .whereIn(['id_rol', 'id_permission'], [[auth.user!.id_rol, thePermission.id]])
        .firstOrFail()
      await next()
    } catch (error) {
      return response.forbidden('El usuario no posee los permisos necesarios')
    }
  }
}
