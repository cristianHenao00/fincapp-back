import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'

export default class FarmsController {
    public async index(ctx: HttpContextContract) {
        return Farm.all()
      }
    
      public async store({ request }: HttpContextContract) {
        const body = request.body()
        const newFarm = await Farm.create(body)
        return newFarm
      }
    
      public async show({ params }: HttpContextContract) {
        return Farm.findOrFail(params.id)
      }
    
      public async update({ params, request }: HttpContextContract) {
        const body = request.body()
        const theFarm = await Farm.findOrFail(params.id)
        theFarm.name = body.name
        theFarm.address = body.address
        theFarm.numberLicense = body.numberLicense
        theFarm.image = body.image
        return theFarm.save()
      }
    
      public async destroy({ params }: HttpContextContract) {
        const theFarm = await Farm.findOrFail(params.id)
        return theFarm.delete()
      }


}
