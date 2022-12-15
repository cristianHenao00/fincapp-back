import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FarmsController {



  // lista las fincas

  public async listFarms(ctx: HttpContextContract) {
    let farms: Farm[] = await Farm.query()
    return farms
  }


  // lista los productos de una finca especifica

  public async listProducts({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('id', params.id).preload('products')

    return theFarm
  }

  /**
  * Lista todos las fincas con sus ordenes y productos asociados
  */


  public async index(ctx: HttpContextContract) {
    let farms: Farm[] = await Farm.query().preload('orders').preload('products')
    return farms
  }

  /**
   * Almacena la información de una finca
   */


  public async store({ request }: HttpContextContract) {
    const post = await request.validate({
      schema: schema.create({
        id_user: schema.number([rules.trim(), rules.required()]),
        name: schema.string([rules.trim(), rules.required()]),
        address: schema.string([rules.trim(), rules.required()]),
        number_license: schema.string([rules.trim(), rules.required()]),
        image: schema.string([rules.trim()]),
      }),
    })
    if (post) {
      const theFarm = await Farm.query()
        .whereIn(['id_user', 'name', 'address', 'number_license', 'image'], 
        [[post.id_user, post.name, post.address, post.number_license, post.image]])
        .first()
      if (!theFarm) {
        const newFarm: Farm = await Farm.create(post)
        return newFarm
      } else {
        return {
          status: 'error',
          message: 'Finca ya creada',
        }
      }
    }
  }

  /**
   * Muestra la información de una sola finca
   */
  public async show({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('id', params.id).preload('orders').preload('products')

    return theFarm
  }

  // Muestra la información de una finca buscada

  public async searchFarm({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('nombre', params.nombre)

    return theFarm
  }

  /**
   * Actualiza la información de una finca basado
   * en el identificador y nuevos parámetros
   */

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theFarm = await Farm.findOrFail(params.id)
    theFarm.name = body.name
    theFarm.address = body.address
    theFarm.number_license = body.number_license
    theFarm.image = body.image
    return theFarm.save()
  }

  /**
   * Elimina una finca basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theFarm = await Farm.findOrFail(params.id)
    return theFarm.delete()
  }
}
