// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import PlantillaSeguridad from 'App/Services/EmailsTemplates/TemplateSecurity'
import EmailService from 'App/Services/EmailService'

export default class SecuritysController {
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')
    const theUser = await User.query().where('email', email).firstOrFail()
    if (await Hash.verify(theUser.password, password)) {
      //Generacion de token
      const token = await auth.use('api').generate(theUser, {
        expiresIn: '60 mins',
      })
      //Obtiene los datos correspondientes a la relacion
      await theUser.load('role')
      theUser.password = ''
      return {
        token: token,
        User: theUser,
      }
    } else {
      return response.unauthorized('Credenciales inválidas')
    }
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    return { revokend: true }
  }

  public async forgotPassword({ auth, request }) {
    let response: Object = {}
    const email = request.input('email')
    const theUser = await User.query().where('email', email).firstOrFail()
    if (!theUser) {
      response = {
        status: 'error',
        message: 'El correo no está registrado en la plataforma.',
      }
    } else {
      const token = await auth.use('api').generate(theUser, {
        expiresIn: '60 mins',
      })
      let templateEmail: PlantillaSeguridad = new PlantillaSeguridad()
      let html = templateEmail.forgotPassword(token.token)
      let serviceEmail: EmailService = new EmailService()
      serviceEmail.sendEmail(email, 'Solicitud restablecimiento de contraseña', html)
      response = {
        status: 'success',
        message: 'Revisar el correo.',
      }
    }
    return response
  }

  public async resetPassword({ auth, request }) {
    let response: Object = {}
    try {
      await auth.use('api').authenticate()
      auth.use('api').isAuthenticated
    } catch (error) {
      return {
        status: 'error',
        message: 'Token corrupto',
      }
    }
    const theUser = await User.findBy('email', auth.user!.email)
    if (!theUser) {
      response = {
        status: 'error',
        message: 'Este usuario no existe',
      }
    } else {
      theUser.password = request.input('password')
      await theUser.save()
      await auth.use('api').revoke()
      response = {
        status: 'success',
        message: 'La contraseña se ha restaurado correctamente',
      }
    }
    return response
  }
}
