import { test } from '@japa/runner'

test.group('Modules', () => {
  test('Listar modulos', async ({ client }) => {
    const response = await client.get('/modules')
    response.assertStatus(200)
  })
  test('Crear modulos', async ({ client }) => {
    const response = await client.post('/modules').json({
      name: 'prueba2',
      description: 'jsjsjjsss',
      path: '/prueba/cobertura2',
      icon: 'jsjsjsjmmm'
    })
    response.assertStatus(200)
  })
  test('Listar modulo', async ({ client }) => {
    const response = await client.get('/modules/2')
    response.assertStatus(200)
  })
  test('Listar modulo no existe', async ({ client }) => {
    const response = await client.get('/modules/100')
    response.assertStatus(404)
  })
  test('Actualizar modulo', async ({ client }) => {
    const response = await client.put('/modules/1').json({
      name: 'Menus',
    })
    response.assertStatus(200)
  })
  test('Actualizar modulo no existe', async ({ client }) => {
    const response = await client.put('/modules/100').json({
      name: 'Menus',
    })
    response.assertStatus(404)
  })
  test('Borrar modulo', async ({ client }) => {
    const response = await client.delete('/modules/11')
    response.assertStatus(200)
  })
  test('Borrar modulo no existe', async ({ client }) => {
    const response = await client.delete('/modules/100')
    response.assertBodyContains({ error: 'El módulo tiene menus asociados' })
  })
})
