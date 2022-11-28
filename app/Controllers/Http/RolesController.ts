import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleModule from 'App/Models/RoleModule'
import User from 'App/Models/User'

export default class RolesController {
  public async index(ctx: HttpContextContract) {
    let roles: Role[] = await Role.query().preload('permissions')
    return roles
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newRole: Role = await Role.create(body)
    return newRole
  }

  public async show({ params }: HttpContextContract) {
    return Role.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theRole: Role = await Role.findOrFail(params.id)
    theRole.name = body.name
    return theRole.save()
  }

  public async destroy({ params }: HttpContextContract) {
    let users = await User.query().where('idRole', params.id)
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
    let modulesMenus = await Role.query()
      .join('role_modules', 'roles.id', 'role_modules.id_role')
      .join('modules', 'role_modules.id_module', 'modules.id')
      .join('module_menus', 'modules.id', 'module_menus.id_module')
      .join('menus', 'module_menus.id_menu', 'menus.id')
      .where('roles.id', params.id)
    return {
      modulesMenus,
    }
  }

  public async modules({ params }: HttpContextContract) {
    let modules = await Role.query()
      .join('role_modules', 'roles.id', 'role_modules.id_role')
      .join('modules', 'role_modules.id_module', 'modules.id')
      .where('roles.id', params.id)
    return {
      modules,
    }
  }
}
