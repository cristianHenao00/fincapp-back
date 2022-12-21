import { test } from '@japa/runner'

test.group('Security', () => {
  test('Acceso correcto', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'soyadmin@gmail.com',
      password: '12345678',
    })
    response.assertStatus(200)
  })

  test('Acceso incorrecto correo', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'soyadmin111@gmail.com',
      password: '12345678',
    })
    response.assertStatus(401)
  })

  test('Acceso incorrecto contraseña', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'soyadmin@gmail.com',
      password: '12345678999',
    })
    response.assertStatus(401)
  })

  test('Acceso error validacion', async ({ client }) => {
    const response = await client.post('/login').json({
      email: '',
      password: '12345678',
    })
    response.assertStatus(422)
  })
})
