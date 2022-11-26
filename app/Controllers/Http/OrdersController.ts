import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class OrdersController {

    /**
   * Lista todos las ordenes
   */
    public async index(ctx: HttpContextContract) {
      let orders:Order[]=await
      Order.query().preload('user').preload('farm')
        return orders;
      }
    
   /**
   * Almacena la información de una orden
   */
      public async store({ request }: HttpContextContract) {
        const body = request.body()
        const newOrder = await Order.create(body)
        return newOrder
      }

     /**
     * Muestra la información de una sola orden
     */
      public async show({ params }: HttpContextContract) {

        let the_order=await
        Order.query().where('id',params.id).preload('user').preload('farm');

        return the_order
      }

      /**
      * Actualiza la información de una orden basado
      * en el identificador y nuevos parámetros
      */
    
      public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theOrder = await Order.findOrFail(params.id)
        theOrder.dateOrder = body.dateOrder
        theOrder.state = body.state
        theOrder.serviceCost = body.serviceCost
        theOrder.shippingCost = body.shippingCost
        theOrder.serviceFee = body.serviceFee
        theOrder.idFarm = body.idFarm;
        theOrder.idUser = body.idUser;

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
