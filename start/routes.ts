/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
/**
 * EndPoints de usuarios
 */
Route.get('/users', 'UsersController.index')
Route.post('/users', 'UsersController.store')
Route.get('/users/:id', 'UsersController.show')
Route.put('/users/:id', 'UsersController.update')
Route.delete('/users/:id', 'UsersController.destroy')
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 784c24a6638dd9fc1c74cad4302e06c52a65f9e6
/**
 * EndPoints de roles
 */
Route.get('/roles', 'RolesController.index')
Route.post('/roles', 'RolesController.store')
Route.get('/roles/:id', 'RolesController.show')
Route.put('/roles/:id', 'RolesController.update')
Route.delete('/roles/:id', 'RolesController.destroy')

/**
 * EndPoints de permisssion
 */
Route.get('/permissions', 'PermissionsController.index')
Route.post('/permissions', 'PermissionsController.store')
Route.get('/permissions/:id', 'PermissionsController.show')
Route.put('/permissions/:id', 'PermissionsController.update')
Route.delete('/permissions/:id', 'PermissionsController.destroy')

/**
 * EndPoints de permisssionRoles
 */
Route.get('/permissionsRoles', 'PermissionsRolesController.index')
Route.post('/permissionsRoles', 'PermissionsRolesController.store')
Route.get('/permissionsRoles/:id', 'PermissionsRolesController.show')
Route.put('/permissionsRoles/:id', 'PermissionsRolesController.update')
Route.delete('/permissionsRoles/:id', 'PermissionsRolesController.destroy')

/**
 * EndPoints de seguridad
 */
Route.post('/login', 'SecuritysController.login')
Route.post('/forgot', 'SecuritysController.forgotPassword')
Route.post('/reset', 'SecuritysController.resetPassword')
Route.post('/logout', 'SecuritysController.logout')
<<<<<<< HEAD
=======
=======

>>>>>>> 784c24a6638dd9fc1c74cad4302e06c52a65f9e6

Route.get('/farms', 'FarmsController.index')
Route.post('/farms', 'FarmsController.store')
Route.get('/farms/:id', 'FarmsController.show')
Route.put('/farms/:id', 'FarmsController.update')
Route.delete('/farms/:id', 'FarmsController.destroy')

Route.get('/orders', 'OrdersController.index')
Route.post('/orders', 'OrdersController.store')
Route.get('/orders/:id', 'OrdersController.show')
Route.put('/orders/:id', 'OrdersController.update')
Route.delete('/orders/:id', 'OrdersController.destroy')

Route.get('/products', 'ProductsController.index')
Route.post('/products', 'ProductsController.store')
Route.get('/products/:id', 'ProductsController.show')
Route.put('/products/:id', 'ProductsController.update')
Route.delete('/products/:id', 'ProductsController.destroy')

Route.get('/categories', 'CategoriesController.index')
Route.post('/categories', 'CategoriesController.store')
Route.get('/categories/:id', 'CategoriesController.show')
Route.put('/categories/:id', 'CategoriesController.update')
Route.delete('/categories/:id', 'CategoriesController.destroy')

Route.get('/states', 'StatesController.index')
Route.post('/states', 'StatesController.store')
Route.get('/states/:id', 'StatesController.show')
Route.put('/states/:id', 'StatesController.update')
Route.delete('/states/:id', 'StatesController.destroy')

Route.get('/ordersStates', 'OrdersStatesController.index')
Route.post('/ordersStates', 'OrdersStatesController.store')
Route.get('/ordersStates/:id', 'OrdersStatesController.show')
Route.put('/ordersStates/:id', 'OrdersStatesController.update')
Route.delete('/ordersStates/:id', 'OrdersStatesController.destroy')

<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> 784c24a6638dd9fc1c74cad4302e06c52a65f9e6
