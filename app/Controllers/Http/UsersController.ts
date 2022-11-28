import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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
    const post = await request.validate({
      schema: schema.create({
        name: schema.string([rules.trim(), rules.required()]),
        email: schema.string([rules.email(), rules.required()]),
        password: schema.string([rules.required()]),
        id_rol: schema.number([rules.required()]),
      }),
    })
    if (post) {
      const theUser = await User.findBy('email', post.email)
      if (!theUser) {
        const newUser: User = await User.create(post)
        User.hashPassword(newUser)
        return newUser
      } else {
        return {
          status: 'error',
          message: 'Usuario ya creado',
        }
      }
    }
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
      .first()
    if (!theUser) {
      return {
        status: 'error',
        message: 'Usuario no encontrado',
      }
    }
    return theUser
  }
  /**
   * Actualiza la información de un usuario basado
   * en el identificador y nuevos parámetros
   */
  public async update({ params, request }: HttpContextContract) {
    const post = await request.validate({
      schema: schema.create({
        name: schema.string([rules.trim(), rules.required()]),
        email: schema.string([rules.email(), rules.required()]),
        id_rol: schema.number([rules.required()]),
      }),
    })
    if (post) {
      const theUser = await User.find(params.id)
      if (theUser) {
        theUser.name = post.name
        theUser.email = post.email
        theUser.id_rol = post.id_rol
        return theUser.save()
      } else {
        return {
          status: 'error',
          message: 'Usuario no encontrado',
        }
      }
    }
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
