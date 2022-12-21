import { test } from '@japa/runner'

test.group('Menus', () => {
  test('Listar menus', async ({ client }) => {
    const response = await client.get('/menus')
    response.assertStatus(200)
  })
  test('Crear menus', async ({ client }) => {
    const response = await client.post('/menus').json({
      name: 'prueba2',
      description: 'prueba de cobertura',
      path: '/prueba2',
      icon: 'icono',
    })
    response.assertStatus(200)
  })
  test('Listar menu', async ({ client }) => {
    const response = await client.get('/menus/1')
    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })
  test('Menu no encontrado', async ({ client }) => {
    const response = await client.get('/menus/100')
    response.assertStatus(404)
  })
  test('Actualizar menu', async ({ client }) => {
    const response = await client.put('/menus/3').json({
      icon: 'icono prueba',
    })
    response.assertStatus(200)
  })
  test('Actualizar menu no existe', async ({ client }) => {
    const response = await client.put('/menus/100').json({
      icon: 'icono prueba',
    })
    response.assertStatus(404)
  })
  test('Borrar menu', async ({ client }) => {
    const response = await client.delete('/menus/30')
    response.assertStatus(200)
  })
  test('Borrar menu no encontrado', async ({ client }) => {
    const response = await client.delete('/menus/200')
    response.assertStatus(404)
  })
})
