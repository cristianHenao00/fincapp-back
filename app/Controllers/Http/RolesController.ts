import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleModule from 'App/Models/RoleModule'
import PermissionRol from 'App/Models/PermissionRol'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Rol from 'App/Models/Role'
import Database from '@ioc:Adonis/Lucid/Database'

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
    const { parent: id_role, child: id_module } = request.body()
    const theRoleModule = await RoleModule.create({
      id_role,
      id_module,
      index: 0,
    })
    return theRoleModule
  }

  public async unassignModule({ request }: HttpContextContract) {
    const { parent: id_role, child: id_module } = request.body()
    const theRoleModule = await RoleModule.query()
      .where('id_role', id_role)
      .where('id_module', id_module)
      .delete()
    return theRoleModule
  }

  public async assignPermission({ request }: HttpContextContract) {
    const { parent: id_rol, child: id_permission } = request.body()
    const thePermissionRol = await PermissionRol.create({
      id_rol,
      id_permission,
      activated: true,
    })
    return thePermissionRol
  }

  public async unassignPermission({ request }: HttpContextContract) {
    const { parent: id_rol, child: id_permission } = request.body()
    const thePermissionRol = await PermissionRol.query()
      .where('id_role', id_rol)
      .where('id_permission', id_permission)
      .delete()
    return thePermissionRol
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

  public async showAssignModules({ params }: HttpContextContract) {
    let modules = await Database.rawQuery(
      `select m.id, m.name, CASE WHEN rm.id_module IS NULL THEN false ELSE true END checked
          from (select id_module from role_modules where id_role = ${params.id})  rm
            right join modules m on rm.id_module = m.id`
    )
    if (!modules || !modules.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return modules.rows
  }

  public async showAssignPermissions({ params }: HttpContextContract) {
    let permissions = await Database.rawQuery(
      `select
          p.id,
          p.url as name,
          CASE WHEN pr.id_permission
          IS NULL THEN false ELSE true
          END checked from
        (select id_permission  from permissions_roles pr where id_rol = ${params.id})  pr
          right join
          permissions p on pr.id_permission = p.id`
    )
    if (!permissions || !permissions.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return permissions.rows
  }
}
