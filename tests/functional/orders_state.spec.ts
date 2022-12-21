import { test } from '@japa/runner'

test.group('Orders states', () => {
  test('Listar estados ordenes', async ({ client }) => {
    const response = await client.get('/ordersStates')
    response.assertStatus(200)
  })
  test('Crear estados ordenes', async ({ client }) => {
    const response = await client.post('/ordersStates').json({
      id_order: 101,
      id_state: 3
    })
    response.assertStatus(200)
  })
  test('Listar estados ordenes', async ({ client }) => {
    const response = await client.get('/ordersStates/3')
    response.assertStatus(200)
  })
  test('Listar estados ordenes no existe', async ({ client }) => {
    const response = await client.get('/ordersStates/100')
    response.assertStatus(404)
  })
  test('Actualizar estados ordenes', async ({ client }) => {
    const response = await client.put('/ordersStates/3').json({
      id_order: 101,
      id_state: 1
    })
    response.assertStatus(200)
  })
  test('Actualizar estados ordenes no existe', async ({ client }) => {
    const response = await client.put('/ordersStates/100').json({
      id_order: 101,
      id_state: 1
    })
    response.assertStatus(404)
  })
  test('Borrar estados ordenes', async ({ client }) => {
    const response = await client.delete('/ordersStates/3')
    response.assertStatus(200)
  })
  test('Borrar estados ordenes no existe', async ({ client }) => {
    const response = await client.delete('/states/100')
    response.assertStatus(404)
  })
})
