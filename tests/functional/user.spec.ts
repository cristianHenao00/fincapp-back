import { test } from '@japa/runner'

test.group('Users', () => {
  test('Listar usuarios', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(200)
  })

  test('Crear usuario', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Pepito',
      email: 'pepito@gmail.com',
      password: '1234',
      id_rol: 1,
    })
    response.assertStatus(200)
  })

  test('Error Validacion creacion', async ({ client }) => {
    const response = await client.post('/users').json({
      name: '',
      email: 'pepito@gmail.com',
      password: '1234',
      id_rol: 1,
    })
    response.assertStatus(422)
  })

  test('Usuario ya creado', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Pepito2',
      email: 'soyusuario@gmail.com',
      password: '1234',
      id_rol: 1,
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Listar usuario', async ({ client }) => {
    const response = await client.get('/users/2')
    response.assertStatus(200)
    response.assertBodyContains({ id: 2 })
  })

  test('Usuario no encontrado', async ({ client }) => {
    const response = await client.get('/users/100')
    response.assertBodyContains({ status: 'error' })
  })

  test('Actualizar usuario', async ({ client }) => {
    const response = await client.put('/users/11').json({
      name: 'Super Usuario',
      email: 'soycliente@gmail.com',
      id_rol: 6,
    })
    response.assertStatus(200)
  })

  test('Error Validacion actualizar', async ({ client }) => {
    const response = await client.put('/users/11').json({
      name: '',
      email: 'soycliente@gmail.com',
      id_rol: 6,
    })
    response.assertStatus(422)
  })

  test('Actualizar usuario no existe', async ({ client }) => {
    const response = await client.put('/users/100').json({
      name: 'Super Administrador',
      email: 'soyusuario@gmail.com',
      id_rol: 1,
    })
    response.assertBodyContains({ status: 'error' })
  })

  test('Borrar usuario', async ({ client }) => {
    const response = await client.delete('/users/12')
    response.assertStatus(200)
  })

  test('Borrar usuario no encontrado', async ({ client }) => {
    const response = await client.delete('/users/100')
    response.assertStatus(404)
  })
})
