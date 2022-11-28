import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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
    const body = request.body()
    const newModuleMenu: ModuleMenu = await ModuleMenu.create(body)
    return newModuleMenu.save()
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
}
