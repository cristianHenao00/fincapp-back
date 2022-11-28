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
/**
 * EndPoints de roles
 */
Route.get('/roles', 'RolesController.index')
Route.post('/roles', 'RolesController.store')
Route.post('/roles/assign', 'RolesController.assignModule')
Route.get('/roles/modules/menus/:id', 'RolesController.modulesMenus')
Route.get('/roles/modules/:id', 'RolesController.modules')
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

Route.get('/listProducts/:id', 'FarmsController.listProducts')
Route.get('/searchFarms/:nombre', 'FarmsController.searchFarm')
Route.get('/listFarms', 'FarmsController.listFarms')
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
/**
 *  Endpoints Modules
 */

Route.get('/modules', 'ModulesController.index')
Route.get('/modules/menus/:id', 'ModulesController.menus')
Route.post('/modules', 'ModulesController.store')
Route.post('/modules/assign', 'ModulesController.assignMenu')
Route.get('/modules/:id', 'ModulesController.show')
Route.put('/modules/:id', 'ModulesController.update')
Route.delete('/modules/:id', 'ModulesController.destroy')

/**
 * EndPoints de Menus
 */

Route.get('/menus', 'MenusController.index')
Route.post('/menus', 'MenusController.store')
Route.get('/menus/:id', 'MenusController.show')
Route.put('/menus/:id', 'MenusController.update')
Route.delete('/menus/:id', 'MenusController.destroy')
=======

Route.get('/stockProducts', 'StockProductsController.index')
Route.post('/stockProducts', 'StockProductsController.store')
Route.get('/stockProducts/:id', 'StockProductsController.show')
Route.put('/stockProducts/:id', 'StockProductsController.update')
Route.delete('/stockProducts/:id', 'StockProductsController.destroy')
>>>>>>> 06fee4cd4520301b701e341c8d16c390e634b651

