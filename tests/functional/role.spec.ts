import { test } from '@japa/runner'

test.group('Roles', () => {
  test('Listar roles', async ({ client }) => {
    const response = await client.get('/roles')
    response.assertStatus(200)
  })

  test('Crear rol', async ({ client }) => {
    const response = await client.post('/roles').json({
      name: 'Prueba-cobertura',
    })
    response.assertStatus(200)
  })

  test('Error Validacion creacion', async ({ client }) => {
    const response = await client.post('/roles').json({
      name: '',
    })
    response.assertStatus(422)
  })

  test('Rol ya creado', async ({ client }) => {
    const response = await client.post('/roles').json({
      name: 'user',
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Listar rol', async ({ client }) => {
    const response = await client.get('/roles/1')
    response.assertStatus(200)
    response.assertBodyContains({ id: 1 })
  })

  test('Rol no encontrado', async ({ client }) => {
    const response = await client.get('/roles/100')
    response.assertBodyContains({ status: 'error' })
  })

  test('Actualizar rol', async ({ client }) => {
    const response = await client.put('/roles/1').json({
      name: 'Administrador',
    })
    response.assertStatus(200)
  })

  test('Error Validacion actualizar', async ({ client }) => {
    const response = await client.put('/roles/1').json({
      name: '',
    })
    response.assertStatus(422)
  })

  test('Actualizar rol no existe', async ({ client }) => {
    const response = await client.put('/roles/100').json({
      name: 'Administrador',
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Borrar rol', async ({ client }) => {
    const response = await client.delete('/roles/12')
    response.assertStatus(200)
  })

  test('Borrar rol con usuarios', async ({ client }) => {
    const response = await client.delete('/roles/100')
    response.assertBodyContains({ error: 'El rol tiene usuarios asociados' })
  })

  test('Borrar rol no encontrado', async ({ client }) => {
    const response = await client.delete('/roles/100')
    response.assertStatus(404)
  })
})
