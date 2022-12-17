import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class PermissionsController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let permissions: Permission[] = await Permission.query()
    return permissions
  }
  /**
   * Almacena la información de un usuario
   */
  public async store({ request }: HttpContextContract) {
    const post = await request.validate({
      schema: schema.create({
        url: schema.string([rules.trim(), rules.required()]),
        method: schema.string([rules.trim(), rules.required()]),
      }),
    })
    if (post) {
      const thePermission = await Permission.query()
        .whereIn(['url', 'method'], [[post.url, post.method]])
        .first()
      if (!thePermission) {
        const newPermission: Permission = await Permission.create(post)
        return newPermission
      } else {
        return {
          status: 'error',
          message: 'Permiso ya creado',
        }
      }
    }
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    const thePermission = Permission.find(params.id)
    if (!thePermission) {
      return {
        status: 'error',
        message: 'Permiso no encontrado',
      }
    }
    return thePermission
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const thePermission = await Permission.find(params.id)
    if (thePermission) {
      const post = await request.validate({
        schema: schema.create({
          url: schema.string([rules.trim(), rules.required()]),
          method: schema.string([rules.trim(), rules.required()]),
        }),
      })
      if (post) {
        thePermission.url = post.url
        thePermission.method = post.method
        return thePermission.save()
      }
    } else {
      return {
        status: 'error',
        message: 'Permiso no encontrado',
      }
    }
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const thePermission: Permission = await Permission.findOrFail(params.id)
    return thePermission.delete()
  }
}
