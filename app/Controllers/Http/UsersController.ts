import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class UsersController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
    let users: User[] = await User.query().preload('farm').preload('orders').preload('role')
    return users
  }
  /**
   * Almacena la información de un usuario
   */
  public async store({ request }: HttpContextContract) {
    const body = request.body()
    body.password = Encryption.encrypt(body.password)
    const newUser: User = await User.create(body)
    return newUser
  }
  /**
   * Muestra la información de un solo usuario
   */
  public async show({ params }: HttpContextContract) {
    let theUser = await User.query()
      .where('id', params.id)
      .preload('farm')
      .preload('orders')
      .preload('role')
    return theUser
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theUser: User = await User.findOrFail(params.id)
    theUser.name = body.name
    theUser.email = body.email
    theUser.password = Encryption.encrypt(body.password)
    theUser.farm = body.farm
    theUser.orders = body.orders
    theUser.id_rol = body.id_rol

    return theUser.save()
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theUser: User = await User.findOrFail(params.id)
    return theUser.delete()
  }

    /**
   * Muestra la informacion de todos los pedidos de ese usuario
   */
     public async showOrders({ params }: HttpContextContract) {
      let theUser = await User.query()
        .where('id', params.id)
        .preload('orders')
        .preload('role')
      return theUser
    }
}
