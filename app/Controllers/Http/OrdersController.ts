import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FileNode } from '@ioc:Adonis/Lucid/Database'
import Order from 'App/Models/Order'

export default class OrdersController {
  //Lista todos las ordenes

  public async index(ctx: HttpContextContract) {
    let orders: Order[] = await Order.query()
      .preload('user')
      .preload('farm')
      .preload('stockProducts')
    return orders
  }

  // Almacena la información de una orden

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newOrder = await Order.create(body)
    return newOrder
  }

  /**
   * Muestra la información de una sola orden
   */
  public async show({ params }: HttpContextContract) {
    let theOrder = await Order.query().where('id', params.id).preload('user').preload('farm')

    return theOrder
  }

  /**
   * Acepta un pedido pendiente
   */

    public async acceptOrder({ params }: HttpContextContract) {
      const theOrder = await Order.findOrFail(params.id)
      if (theOrder.state != true  ) {
        theOrder.state = true  
      }
       return theOrder.save()
    }
 
  /**
   * Actualiza la información de una orden basado
   * en el identificador y nuevos parámetros
   */

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theOrder = await Order.findOrFail(params.id)
    theOrder.date_order = body.date_order
    theOrder.state = body.state
    theOrder.service_cost = body.service_cost
    theOrder.shipping_cost = body.shipping_cost
    theOrder.service_fee = body.service_fee
    theOrder.id_farm = body.id_farm
    theOrder.id_user = body.id_user

    return theOrder.save()
  }

  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theOrder = await Order.findOrFail(params.id)
    return theOrder.delete()
  }


}
