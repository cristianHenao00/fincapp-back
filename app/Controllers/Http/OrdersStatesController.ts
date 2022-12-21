import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderState from 'App/Models/OrderState'

export default class OrdersStatesController {
  public async index(ctx: HttpContextContract) {
    let orderstates: OrderState[] = await OrderState.query()
    return orderstates
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newOrderState = await OrderState.create(body)
    return newOrderState
  }

  public async show({ params }: HttpContextContract) {
    return OrderState.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theOrderState = await OrderState.findOrFail(params.id)
    theOrderState.id_order = body.id_order
    theOrderState.id_state = body.id_state
    return theOrderState.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theOrderState = await OrderState.findOrFail(params.id)
    return theOrderState.delete()
  }
}
