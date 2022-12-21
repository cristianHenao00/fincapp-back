import { test } from '@japa/runner'

test.group('Products', () => {
  test('Listar productos', async ({ client }) => {
    const response = await client.get('/products')
    response.assertStatus(200)
  })

  test('Crear producto', async ({ client }) => {
    const response = await client.post('/products').json({
      name: 'prueba1',
      id_farm: 8,
      id_category: 2
    })
    response.assertStatus(200)
  })

  test('Listar producto', async ({ client }) => {
    const response = await client.get('/products/8')
    response.assertStatus(200)
  })

  test('Actualizar producto', async ({ client }) => {
    const response = await client.put('/products/9').json({
      name: 'producto prueba',
      id_farm: 8,
      id_category: 2
    })
    response.assertStatus(200)
  })

  test('Actualizar producto no existe', async ({ client }) => {
    const response = await client.put('/products/100').json({
      name: 'producto prueba',
      id_farm: 8,
      id_category: 2
    })
    response.assertStatus(404)
  })

  test('Borrar producto', async ({ client }) => {
    const response = await client.delete('/products/9')
    response.assertStatus(200)
  })

  test('Borrar producto no encontrado', async ({ client }) => {
    const response = await client.delete('/products/100')
    response.assertStatus(404)
  })
})
