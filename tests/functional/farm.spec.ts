import { test } from '@japa/runner'

test.group('Farms', () => {
  test('Listar granjas', async ({ client }) => {
    const response = await client.get('/farms')
    response.assertStatus(200)
  })

  test('Listar granja', async ({ client }) => {
    const response = await client.get('/farms/8')
    response.assertStatus(200)
  })

  test('Listar granja de usuario', async ({ client }) => {
    const response = await client.get('/farms/farmer/14')
    response.assertStatus(200)
  })

  test('Borrar granja', async ({ client }) => {
    const response = await client.get('/farms/8')
    response.assertStatus(200)
  })

  test('Borrar granja no existe', async ({ client }) => {
    const response = await client.get('/farms/100')
    response.assertStatus(404)
  })
})
