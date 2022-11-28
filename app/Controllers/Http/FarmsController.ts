import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'

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
    const body = request.body()
    const newFarm = await Farm.create(body)
    return newFarm
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
    theFarm.nombre = body.nombre
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
