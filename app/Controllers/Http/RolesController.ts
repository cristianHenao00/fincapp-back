import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleModule from 'App/Models/RoleModule'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Rol from 'App/Models/Role'

export default class RolesController {
  public async index(ctx: HttpContextContract) {
    let roles: Role[] = await Role.query().preload('permissions')
    return roles
  }

  public async store({ request }: HttpContextContract) {
    const post = await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
      }),
    })
    if (post) {
      const theRole = await Role.findBy('name', post.name)
      if (!theRole) {
        const newRole: Role = await Role.create(post)
        return newRole
      } else {
        return {
          status: 'error',
          message: 'Rol ya creado',
        }
      }
    }
  }

  public async show({ params }: HttpContextContract) {
    const theRole = await Role.find(params.id)
    if (!theRole) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return theRole
  }

  public async update({ params, request }: HttpContextContract) {
    const theRole = await Role.find(params.id)
    if (theRole) {
      const post = await request.validate({
        schema: schema.create({
          name: schema.string([rules.trim(), rules.required()]),
        }),
      })
      if (post) {
        theRole.name = post.name
        return theRole.save()
      }
    } else {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
  }

  public async destroy({ params }: HttpContextContract) {
    let users = await User.query().where('id_rol', params.id)
    if (users) {
      return {
        error: 'El rol tiene usuarios asociados',
        users: users,
      }
    } else {
      const theRole: Role = await Role.findOrFail(params.id)
      return theRole.delete()
    }
  }

  public async assignModule({ request }: HttpContextContract) {
    const body = request.body()
    const newRoleModule: RoleModule = await RoleModule.create(body)
    return newRoleModule.save()
  }

  public async modulesMenus({ params }: HttpContextContract) {
    let rol = await Rol.query()
      .where('id', params.id)
      .preload('modules', (query) => {
        query.preload('menus')
      })

    if (!rol || rol.length == 0) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }

    const modules = rol[0].modules

    if (!modules || modules.length == 0) {
      return {
        status: 'error',
        message: 'Rol no tiene modulos asignados',
      }
    }

    return {
      modules,
    }
  }

  public async modules({ params }: HttpContextContract) {
    let modules = await Role.query()
      .join('role_modules', 'roles.id', 'role_modules.id_role')
      .join('modules', 'role_modules.id_module', 'modules.id')
      .where('roles.id', params.id)
      .preload('modules')
    return {
      modules,
    }
  }
}
