import Env from '@ioc:Adonis/Core/Env'

export default class EmailService {
  public sendEmail(emailTo, theSubject, theHTML) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApikey(Env.get('SENDGRID_API_KEY'))
    const msg = {
      to: emailTo,
      from: Env.get('SENDGRID_FROM_EMAIL'),
      subject: theSubject,
      html: theHTML,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
