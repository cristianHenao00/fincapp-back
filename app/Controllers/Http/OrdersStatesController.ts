import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrderState from 'App/Models/OrderState'

export default class OrdersStatesController {
    public async index(ctx: HttpContextContract) {
        return OrderState.all()
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
        return theOrderState.save()
      }
    
      public async destroy({ params }: HttpContextContract) {
        const theOrderState = await OrderState.findOrFail(params.id)
        return theOrderState.delete()
      }
}
