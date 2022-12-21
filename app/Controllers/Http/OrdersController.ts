import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FileNode } from '@ioc:Adonis/Lucid/Database'
import ItemsProduct from 'App/Models/ItemsProduct'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export default class OrdersController {

   //buscar Orden false
   public async searchOrder2({ params }: HttpContextContract) {
    let theOrder = await User.query().where('id', params.id).preload('orders')
    if(theOrder){

    }
    return theOrder
  }

  public async searchOrder({ params }: HttpContextContract) {
    const theOrder = await Order.findOrFail(params.id)
    theOrder.state = false
    return theOrder.save()
  }



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
  // Almacena la información de una orden

  public async createOrder(order:any) {
    const newOrder = await Order.create(order)
    return newOrder.$attributes
  }

  public async saveProductOrder({ request }: HttpContextContract){
    const {id_user,id_farm,id_stock,amount} = request.body()
    const order = await Order.query().where("id_farm",id_farm).where("id_user",id_user).where("state",true)

    console.log(order)
    
    if(order.length===0){
      const new_order = {
        id_user,
        id_farm,
        date_order: new Date(),
        state:true,
        service_cost:0,
        shipping_cost:0,
        service_fee:0
    }
    
      const orderCreate = await this.createOrder(new_order)
      console.log(orderCreate)

      const orderProduct={id_stock,amount,id_order:orderCreate.id}
      const orderProductCreate =  await ItemsProduct.create(orderProduct)

      return orderProductCreate
    }
    const orderProduct={id_stock,amount,id_order:order[0].id}
    const orderProductCreate =  await ItemsProduct.create(orderProduct)

    return orderProductCreate
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

   /**
   * consolidar orden
   */
   public async consolidateOrder({ params }: HttpContextContract) {
    const theOrder = await Order.findOrFail(params.id)
    theOrder.state = true
    return theOrder.save()
  }


}
