import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'

export default class FarmsController {
  /**
   * Lista todos las ordenes
   */
  public async index(ctx: HttpContextContract) {
    let farms: Farm[] = await Farm.query().preload('orders')
    return farms
  }

  /**
   * Almacena la información de una orden
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newFarm = await Farm.create(body)
    return newFarm
  }

  /**
   * Muestra la información de una sola orden
   */
  public async show({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('id', params.id).preload('orders')

    return theFarm
  }

  /**
   * Actualiza la información de una orden basado
   * en el identificador y nuevos parámetros
   */

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theFarm = await Farm.findOrFail(params.id)
    theFarm.name = body.name
    theFarm.address = body.address
    theFarm.number_license = body.number_license
    theFarm.image = body.image
    theFarm.orders = body.orders
    return theFarm.save()
  }

  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theFarm = await Farm.findOrFail(params.id)
    return theFarm.delete()
  }
}
