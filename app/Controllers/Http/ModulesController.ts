import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Module from 'App/Models/Module'
import ModuleMenu from 'App/Models/ModuleMenu'

export default class ModulesController {
  public async index(ctx: HttpContextContract) {
    let modules: Module[] = await Module.query().preload('menus')
    return modules
  }

  public async menus({ params }: HttpContextContract) {
    let menus = await Module.query()
      .join('module_menus', 'modules.id', 'module_menus.id_module')
      .join('menus', 'module_menus.id_menu', 'menus.id')
      .where('modules.id', params.id)
    return {
      menus,
    }
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newRole: Module = await Module.create(body)
    return newRole
  }

  public async show({ params }: HttpContextContract) {
    return Module.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theModule: Module = await Module.findOrFail(params.id)
    theModule.name = body.name
    return theModule.save()
  }

  public async assignMenu({ request }: HttpContextContract) {
    const { parent: id_module, child: id_menu } = request.body()
    const theRoleModule = await ModuleMenu.create({
      id_module,
      id_menu,
      index: 0,
    })
    return theRoleModule
  }

  public async unassignMenu({ request }: HttpContextContract) {
    const { parent: id_module, child: id_menu } = request.body()
    const theRoleModule = await ModuleMenu.query()
      .where('id_module', id_module)
      .where('id_menu', id_menu)
      .delete()
    return theRoleModule
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      const theModule: Module = await Module.findOrFail(params.id)
      return theModule.delete()
    } catch (e) {
      return {
        error: 'El módulo tiene menus asociados',
      }
    }
  }

  public async showAssignMenus({ params }: HttpContextContract) {
    let menus = await Database.rawQuery(
      `select
          m.id,
          m.name,
          CASE WHEN mm.id_menu IS NULL THEN false ELSE true END checked
        from
        (select id_menu from module_menus
        where id_module = ${params.id}) mm right join menus m
        on mm.id_menu = m.id`
    )
    if (!menus || !menus.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return menus.rows
  }
}
