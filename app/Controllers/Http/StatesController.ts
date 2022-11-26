import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'

export default class StatesController {
  public async index(ctx: HttpContextContract) {
    let states: State[] = await State.query().preload('orders')
    return states
  }

  public async store({ request }: HttpContextContract) {
    const body = request.body()
    const newState = await State.create(body)
    return newState
  }

  public async show({ params }: HttpContextContract) {
    return State.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theState = await State.findOrFail(params.id)
    theState.name = body.name
    return theState.save()
  }

  public async destroy({ params }: HttpContextContract) {
    const theState = await State.findOrFail(params.id)
    return theState.delete()
  }
}
