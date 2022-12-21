import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Farm from 'App/Models/Farm'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class FarmsController {
  // lista las fincas

  public async listFarms(ctx: HttpContextContract) {
    let farms: Farm[] = await Farm.query()
    return farms
  }

  // lista los productos de una finca especifica

  public async listProducts({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('id', params.id).preload('products')

    return theFarm
  }

  /**
   * Lista todos las fincas con sus ordenes y productos asociados
   */

  public async index(ctx: HttpContextContract) {
    let farms: Farm[] = await Farm.query()
    return farms
  }

  public async users(ctx: HttpContextContract) {
    let farms = await Database.rawQuery(
      `select
          f.id,
          f.name,
          f.address,
          f.image,
          CASE WHEN r.id_user IS NULL THEN 0 ELSE r.value END rating
        from
          farms f left join ratings r
            on f.id = r.id_user`
    )
    if (!farms || !farms.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return farms.rows
  }

  public async products({ params }: HttpContextContract) {
    let products = await Database.rawQuery(
      `select
      sp.id,
      p.name,
      p.category_name,
      sp.value,
      sp.amount
      from (select pr.*, c.name as category_name from products pr
          join categories c
          on pr.id_category = c.id
          where id_farm = ${params.id}) p join stock_product sp
          on p.id = sp.id_product
          where sp.visibility = true `
    )
    if (!products || !products.rows) {
      return {
        status: 'error',
        message: 'Rol no encontrado',
      }
    }
    return products.rows
  }

  public async farmer({ params }: HttpContextContract) {
    let farms: Farm[] = await Farm.query().where('id_user', params.id)
    return farms
  }

  /**
   * Almacena la información de una finca
   */

  public async store({ request }: HttpContextContract) {
    const image = request.file('image')
    const body = request.body()
    const newFarm = await Farm.create({
      ...body,
      image: '',
    })
    if (newFarm) {
      if (image) {
        await image.move(Application.resourcesPath('farms'), {
          name: `${newFarm.id}_${newFarm.id_user}.${image.extname}`,
          overwrite: true,
        })
        newFarm.image = image.fileName ? image.fileName : ''
        await newFarm.save()
      }
    }

    return newFarm
  }

  /**
   * Muestra la información de una sola finca
   */
  public async show({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('id', params.id).preload('orders').preload('products')

    return theFarm
  }

  // Muestra la información de una finca buscada

  public async searchFarm({ params }: HttpContextContract) {
    let theFarm = await Farm.query().where('nombre', params.nombre)

    return theFarm
  }

  /**
   * Actualiza la información de una finca basado
   * en el identificador y nuevos parámetros
   */

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()
    const theFarm = await Farm.findOrFail(params.id)
    theFarm.name = body.name
    theFarm.address = body.address
    theFarm.number_license = body.number_license
    theFarm.image = body.image
    return theFarm.save()
  }

  /**
   * Elimina una finca basado en el identificador
   */
  public async destroy({ params }: HttpContextContract) {
    const theFarm = await Farm.findOrFail(params.id)
    return theFarm.delete()
  }
}
