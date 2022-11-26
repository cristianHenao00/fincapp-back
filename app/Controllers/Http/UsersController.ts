import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Encryption from '@ioc:Adonis/Core/Encryption'

export default class UsersController {
  /**
   * Lista todos los usuarios
   */
  public async index(ctx: HttpContextContract) {
<<<<<<< HEAD
    let users: User[] = await User.query().preload('role')
    return users
=======

    let users:User[]=await
      User.query().preload('farm').preload('orders').preload('role')
        return users;

>>>>>>> main
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
<<<<<<< HEAD
    let theUser = await User.query().where('id', params.id)
    return theUser
=======
    let the_user=await
        User.query().where('id',params.id).preload('farm').preload('orders').preload('role')

        return the_user

>>>>>>> main
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
<<<<<<< HEAD
    theUser.idRol = body.idRol
=======
    theUser.farm = body.farm
    theUser.orders = body.orders
    theUser.idRol = body.idRol

>>>>>>> main
    return theUser.save()
  }
  /**
   * Elimina a un usuario basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theUser: User = await User.findOrFail(params.id)
    return theUser.delete()
  }
}
