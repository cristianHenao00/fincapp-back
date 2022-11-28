// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import PlantillaSeguridad from 'App/Services/EmailsTemplates/TemplateSecurity'
import EmailService from 'App/Services/EmailService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class SecuritysController {
  public async login({ auth, request, response }) {
    const post = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email(), rules.required()]),
        password: schema.string([rules.required()]),
      }),
    })
    const theUser = await User.findBy('email', post.email)
    if (theUser) {
      if (await Hash.verify(theUser.password, post.password)) {
        //Generacion de token
        const token = await auth.use('api').generate(theUser, {
          expiresIn: '60 mins',
        })
        //Obtiene los datos correspondientes a la relacion
        await theUser.load('role')
        await theUser.load('farm')
        await theUser.load('orders')
        theUser.password = ''
        return {
          token: token,
          User: theUser,
        }
      } else {
        return response.unauthorized('Credenciales inválidas')
      }
    } else {
      return response.unauthorized('Correo no registrado')
    }
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    return { revokend: true }
  }

  public async forgotPassword({ auth, request }) {
    const post = await request.validate({
      schema: schema.create({
        email: schema.string([rules.email(), rules.required()]),
      }),
    })
    const theUser = await User.findBy('email', post.email)
    if (!theUser) {
      return {
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
      serviceEmail.sendEmail(post.email, 'Solicitud restablecimiento de contraseña', html)
      return {
        status: 'success',
        message: 'Revisar el correo.',
      }
    }
  }

  public async resetPassword({ auth, request }) {
    const theUser = await User.findBy('email', auth.user!.email)
    if (!theUser) {
      return {
        status: 'error',
        message: 'Este usuario no existe',
      }
    } else {
      const post = await request.validate({
        schema: schema.create({
          password: schema.string([rules.required()]),
        }),
      })
      theUser.password = post.password
      User.hashPassword(theUser)
      await theUser.save()
      await auth.use('api').revoke()
      return {
        status: 'success',
        message: 'La contraseña se ha restaurado correctamente',
      }
    }
  }
}
