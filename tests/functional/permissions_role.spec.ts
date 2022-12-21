import { test } from '@japa/runner'

test.group('Permissions roles', () => {
  test('Listar permisos roles', async ({ client }) => {
    const response = await client.get('/permissionsRoles')
    response.assertStatus(200)
  })

  test('Crear permiso roles', async ({ client }) => {
    const response = await client.post('/permissionsRoles').json({
      id_rol: 6,
      id_permission: 21,
      activated: true
    })
    response.assertStatus(200)
  })

  test('Error Validacion creacion', async ({ client }) => {
    const response = await client.post('/permissionsRoles').json({
      id_rol: '',
      id_permission: 21,
      activated: true
    })
    response.assertStatus(422)
  })

  test('Permiso rol ya creado', async ({ client }) => {
    const response = await client.post('/permissionsRoles').json({
      id_rol: 1,
      id_permission: 4,
      activated: true
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Listar permiso rol', async ({ client }) => {
    const response = await client.get('/permissionsRoles/1')
    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })

  test('Permiso rol no encontrado', async ({ client }) => {
    const response = await client.get('/permissionsRoles/100')
    response.assertStatus(404)
  })

  test('Actualizar permiso rol', async ({ client }) => {
    const response = await client.put('/permissionsRoles/2').json({
      id_rol: 1,
      id_permission: 2,
      activated: true
    })
    response.assertStatus(200)
  })

  test('Error Validacion actualizar', async ({ client }) => {
    const response = await client.put('/permissionsRoles/2').json({
      id_rol: '',
      id_permission: 2,
      activated: false
    })
    response.assertStatus(422)
  })

  test('Actualizar permiso rol no existe', async ({ client }) => {
    const response = await client.put('/permissionsRoles/100').json({
      id_rol: 1,
      id_permission: 2,
      activated: false
    })
    response.assertStatus(404)
  })

  test('Borrar permiso rol', async ({ client }) => {
    const response = await client.delete('/permissionsRoles/37')
    response.assertStatus(200)
  })

  test('Borrar permiso rol no encontrado', async ({ client }) => {
    const response = await client.delete('/permissionsRoles/100')
    response.assertStatus(404)
  })
})
