import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {

    public async index(ctx: HttpContextContract) {
        return Order.all()
      }
    
      public async store({ request }: HttpContextContract) {
        const body = request.body()
        const newOrder = await Order.create(body)
        return newOrder
      }
    
      public async show({ params }: HttpContextContract) {
        return Order.findOrFail(params.id)
      }
    
      public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theOrder = await Order.findOrFail(params.id)
        theOrder.dateOrder = body.dateOrder
        theOrder.state = body.state
        theOrder.serviceCost = body.serviceCost
        theOrder.shippingCost = body.shippingCost
        theOrder.serviceFee = body.serviceFee

        return theOrder.save()
      }
    
      public async destroy({ params }: HttpContextContract) {
        const theOrder = await Order.findOrFail(params.id)
        return theOrder.delete()
      }

}
