import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import fs from 'fs'

export default class PublicController {
  //Lista todos los productos

  public async farms({ request, response }: HttpContextContract) {
    const path = Application.resourcesPath('farms')
    const filePath = `${path}\\${request.params().image}`
    const image = fs.createReadStream(filePath)
    response.stream(image)
    response.header('Content-Type', 'image/jpeg')
  }
  public async products({ request, response }: HttpContextContract) {
    const path = Application.resourcesPath('products')
    const filePath = `${path}\\${request.params().image}`
    const image = fs.createReadStream(filePath)
    response.stream(image)
    response.header('Content-Type', 'image/jpeg')
  }
}
