import { test } from '@japa/runner'

test.group('Permissions', () => {
  test('Listar permisos', async ({ client }) => {
    const response = await client.get('/permissions')
    response.assertStatus(200)
  })

  test('Crear permiso', async ({ client }) => {
    const response = await client.post('/permissions').json({
      url: '/Prueba1',
      method: 'POST',
    })
    response.assertStatus(200)
  })

  test('Error Validacion creacion', async ({ client }) => {
    const response = await client.post('/permissions').json({
      url: '',
      method: 'POST',
    })
    response.assertStatus(422)
  })

  test('Permiso ya creado', async ({ client }) => {
    const response = await client.post('/permissions').json({
      url: '/roles',
      method: 'GET',
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Listar permiso', async ({ client }) => {
    const response = await client.get('/permissions/1')
    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })

  test('Permiso no encontrado', async ({ client }) => {
    const response = await client.get('/permissions/100')
    response.assertStatus(404)
  })

  test('Actualizar permiso', async ({ client }) => {
    const response = await client.put('/permissions/2').json({
      url: '/permissionsPrueba-c',
      method: 'GET',
    })
    response.assertStatus(200)
  })

  test('Error Validacion actualizar', async ({ client }) => {
    const response = await client.put('/permissions/2').json({
      url: '/permissionsPrueba-c',
      method: '',
    })
    response.assertStatus(422)
  })

  test('Actualizar permiso no existe', async ({ client }) => {
    const response = await client.put('/permissions/100').json({
      url: '/permissionsPrueba',
      method: 'GET',
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Borrar permiso', async ({ client }) => {
    const response = await client.delete('/permissions/33')
    response.assertStatus(200)
  })

  test('Borrar permiso no encontrado', async ({ client }) => {
    const response = await client.delete('/permissions/200')
    response.assertStatus(404)
  })
})
