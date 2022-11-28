import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermissionRol from 'App/Models/PermissionRol'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
    const post = await request.validate({
      schema: schema.create({
        id_rol: schema.number([rules.required()]),
        id_permission: schema.number([rules.required()]),
        activated: schema.boolean([rules.required()]),
      }),
    })
    if (post) {
      const thePermissionRole = await PermissionRol.query()
        .whereIn(['id_rol', 'id_permission'], [[post.id_rol, post.id_permission]])
        .first()
      if (!thePermissionRole) {
        const newPermissionRole: PermissionRol = await PermissionRol.create(post)
        return newPermissionRole
      } else {
        return {
          status: 'error',
          message: 'PermisoRol ya creado',
        }
      }
    }
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    const thePermissionRole = PermissionRol.find(params.id)
    if (!thePermissionRole) {
      return {
        status: 'error',
        message: 'PermisoRol no encontrado',
      }
    }
    return thePermissionRole
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    if (thePermissionRole) {
      const post = await request.validate({
        schema: schema.create({
          id_rol: schema.number([rules.required()]),
          id_permission: schema.number([rules.required()]),
          activated: schema.boolean([rules.required()]),
        }),
      })
      if (post) {
        thePermissionRole.id_rol = post.id_rol
        thePermissionRole.id_permission = post.id_permission
        thePermissionRole.activated = post.activated
        return thePermissionRole.save()
      }
    } else {
      return {
        status: 'error',
        message: 'PermisoRol no encontrado',
      }
    }
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    return thePermissionRole.delete()
  }

  public async activate({ params }: HttpContextContract) {
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    if (thePermissionRole.activated === false) {
      thePermissionRole.activated = true
      thePermissionRole.save()
      return {
        status: 'success',
        message: 'PermisoRol activado',
      }
    }
    return {
      status: 'error',
      message: 'PermisoRol ya se encuentra activado',
    }
  }

  public async suspend({ params }: HttpContextContract) {
    const thePermissionRole: PermissionRol = await PermissionRol.findOrFail(params.id)
    if (thePermissionRole.activated === true) {
      thePermissionRole.activated = false
      thePermissionRole.save()
      return {
        status: 'success',
        message: 'PermisoRol Suspendido',
      }
    }
    return {
      status: 'error',
      message: 'PermisoRol ya se encuentra Suspendido',
    }
  }
}
