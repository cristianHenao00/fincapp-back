import Env from '@ioc:Adonis/Core/Env'

export default class PlantillaSeguridad {
  public forgotPassword(token: string) {
    let html = '<h1>Sistema Fincapp</h1>'

    html +=
      "<p>Para solicitar el restablecimiento de su contraseña ingrese  <a href='" +
      Env.get('URL_FRONTEND') +
      '/#/security/change-password/' +
      token +
      "'>aquí</a></p>"

    return html
  }

  public resetPassword(token: string) {
    let html = '<h1>Sistema Fincapp</h1>'
    html +=
      "<p>Para cambiar su contraseña ingrese <a href='" +
      Env.get('URL_FRONTEND') +
      '/#/security/change-password/' +
      token +
      "'>aquí</a></p>"

    return html
  }
}
