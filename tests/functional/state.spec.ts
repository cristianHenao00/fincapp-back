import { test } from '@japa/runner'

test.group('States', () => {
  test('Listar estados', async ({ client }) => {
    const response = await client.get('/states')
    response.assertStatus(200)
  })
  test('Crear estado', async ({ client }) => {
    const response = await client.post('/states').json({
      name: 'Cobertura-prueba',
    })
    response.assertStatus(200)
  })
  test('Listar estado', async ({ client }) => {
    const response = await client.get('/states/1')
    response.assertStatus(200)
  })
  test('Listar estado no existe', async ({ client }) => {
    const response = await client.get('/states/100')
    response.assertStatus(404)
  })
  test('Actualizar estado', async ({ client }) => {
    const response = await client.put('/states/3').json({
      name: 'Prueba-cobertura',
    })
    response.assertStatus(200)
  })
  test('Actualizar estado no existe', async ({ client }) => {
    const response = await client.put('/states/100').json({
      name: 'Prueba - cobertura',
    })
    response.assertStatus(404)
  })
  test('Borrar estado', async ({ client }) => {
    const response = await client.delete('/states/3')
    response.assertStatus(200)
  })
  test('Borrar estado no existe', async ({ client }) => {
    const response = await client.delete('/states/100')
    response.assertStatus(404)
  })
})
