import { test } from '@japa/runner'

test.group('Categories', () => {
  test('Listar categorias', async ({ client }) => {
    const response = await client.get('/categories')
    response.assertStatus(200)
  })
  test('Crear categoria', async ({ client }) => {
    const response = await client.post('/categories').json({
      name: 'prueba1',
    })
    response.assertStatus(200)
  })
  test('Listar categoria', async ({ client }) => {
    const response = await client.get('/categories/2')
    response.assertStatus(200)
  })
  test('Listar categoria no existe', async ({ client }) => {
    const response = await client.get('/categories/100')
    response.assertStatus(404)
  })
  test('Actualizar categoria', async ({ client }) => {
    const response = await client.put('/categories/2').json({
      name: 'Procesados prueba-c',
    })
    response.assertStatus(200)
  })
  test('Actualizar categoria no existe', async ({ client }) => {
    const response = await client.put('/categories/100').json({
      name: 'Procesados prueba-c',
    })
    response.assertStatus(404)
  })
  test('Borrar categoria', async ({ client }) => {
    const response = await client.delete('/categories/2')
    response.assertStatus(200)
  })
  test('Borrar categoria no existe', async ({ client }) => {
    const response = await client.delete('/categories/100')
    response.assertStatus(404)
  })
})
