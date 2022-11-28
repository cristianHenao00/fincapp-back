import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserAccess {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    try {
      await auth.use('api').authenticate()
      await next()
    } catch (error) {
      return response.forbidden('El usuario no ha iniciado sesion')
    }
  }
}
