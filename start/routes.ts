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
Route.group(() => {
  Route.get('/usersShowOrders/:id', 'UsersController.showOrders') //cliente
  Route.get('/users', 'UsersController.index')
  Route.post('/users', 'UsersController.store') //cliente
  Route.get('/users/:id', 'UsersController.show') //cliente
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')
/**
 * EndPoints de roles
 */
Route.group(() => {
  Route.get('/roles', 'RolesController.index')
  Route.post('/roles', 'RolesController.store')
  Route.post('/roles/module/assign', 'RolesController.assignModule')
  Route.post('/roles/module/unassign', 'RolesController.unassignModule')
  Route.post('/roles/permissions/assign', 'RolesController.assignPermission')
  Route.post('/roles/permissions/unassign', 'RolesController.unassignPermission')
  Route.get('/roles/modules/menus/:id', 'RolesController.modulesMenus')
  Route.get('/roles/modules/:id', 'RolesController.showAssignModules')
  Route.get('/roles/permissions/:id', 'RolesController.showAssignPermissions')
  Route.get('/roles/:id', 'RolesController.show')
  Route.put('/roles/:id', 'RolesController.update')
  Route.delete('/roles/:id', 'RolesController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

/**
 * EndPoints de permisssion
 */
Route.group(() => {
  Route.get('/permissions', 'PermissionsController.index')
  Route.post('/permissions', 'PermissionsController.store')
  Route.get('/permissions/:id', 'PermissionsController.show')
  Route.put('/permissions/:id', 'PermissionsController.update')
  Route.delete('/permissions/:id', 'PermissionsController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

/**
 * EndPoints de permisssionRoles
 */
Route.group(() => {
  Route.get('/permissionsRoles', 'PermissionsRolesController.index')
  Route.post('/permissionsRoles', 'PermissionsRolesController.store')
  Route.get('/permissionsRoles/:id', 'PermissionsRolesController.show')
  Route.put('/permissionsRoles/:id', 'PermissionsRolesController.update')
  Route.delete('/permissionsRoles/:id', 'PermissionsRolesController.destroy')
  Route.post('/permissionsRoles/activate/:id', 'PermissionsRolesController.activate')
  Route.post('/permissionsRoles/suspend/:id', 'PermissionsRolesController.suspend')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

/**
 * EndPoints de seguridad
 */
Route.group(() => {
  Route.post('/login', 'SecuritysController.login')
  Route.post('/signin', 'SecuritysController.signin')
  Route.post('/forgot', 'SecuritysController.forgotPassword')
  Route.post('/reset', 'SecuritysController.resetPassword')//.middleware('userAccess')
  Route.post('/logout', 'SecuritysController.logout')//.middleware('userAccess')
})

Route.group(() => {
  /**
   * EndPoints de farms
   */
  Route.get('/farms', 'FarmsController.index') //admin
  Route.post('/farms', 'FarmsController.store')
  Route.get('/farms/farmer/:id', 'FarmsController.farmer') //cliente
  Route.get('/farms/:id', 'FarmsController.show') //cliente
  Route.put('/farms/:id', 'FarmsController.update')
  Route.delete('/farms/:id', 'FarmsController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

Route.group(() => {
  /**
   * EndPoints de orders
   */
  Route.get('/orders', 'OrdersController.index')
  Route.post('/orders', 'OrdersController.store') //cliente
  Route.get('/orders/:id', 'OrdersController.show')
  Route.put('/orders/:id', 'OrdersController.update')
  Route.delete('/orders/:id', 'OrdersController.destroy')
  Route.get('/orders/searchOrder/:id', 'OrdersController.searchOrder')
  Route.get('/orders/searchOrder2/:id', 'OrdersController.searchOrder2')

  Route.put('/orders/consolidateOrder/:id', 'OrdersController.consolidateOrder')

  Route.post('/orders/saveProductOrder', 'OrdersController.saveProductOrder') 



  



  
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

Route.group(() => {
  Route.get('/products', 'ProductsController.index') //cliente
  Route.post('/products', 'ProductsController.store')
  Route.get('/products/farmer/:id', 'ProductsController.farmer')
  Route.get('/products/:id', 'ProductsController.show') //cliente
  Route.put('/products/:id', 'ProductsController.update')
  Route.delete('/products/:id', 'ProductsController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

Route.group(() => {
  Route.get('/categories', 'CategoriesController.index') //cliente
  Route.post('/categories', 'CategoriesController.store')
  Route.get('/categories/:id', 'CategoriesController.show')
  Route.put('/categories/:id', 'CategoriesController.update')
  Route.delete('/categories/:id', 'CategoriesController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

Route.group(() => {
  Route.get('/states', 'StatesController.index')
  Route.post('/states', 'StatesController.store')
  Route.get('/states/:id', 'StatesController.show')
  Route.put('/states/:id', 'StatesController.update')
  Route.delete('/states/:id', 'StatesController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

Route.group(() => {
  Route.get('/ordersStates', 'OrdersStatesController.index')
  Route.post('/ordersStates', 'OrdersStatesController.store')
  Route.get('/ordersStates/:id', 'OrdersStatesController.show')
  Route.put('/ordersStates/:id', 'OrdersStatesController.update')
  Route.delete('/ordersStates/:id', 'OrdersStatesController.destroy')
})
  // .middleware('userAccess')
  // .middleware('permissionAccess')

/**
 *  Endpoints Modules
 */
Route.group(() => {
  Route.get('/modules', 'ModulesController.index')
  // Route.get('/modules/menus/:id', 'ModulesController.menus')
  Route.post('/modules', 'ModulesController.store')
  Route.post('/modules/menu/assign', 'ModulesController.assignMenu')
  Route.post('/modules/menu/unassign', 'ModulesController.unassignMenu')
  Route.get('/modules/menus/:id', 'ModulesController.showAssignMenus')
  Route.get('/modules/:id', 'ModulesController.show')
  Route.put('/modules/:id', 'ModulesController.update')
  Route.delete('/modules/:id', 'ModulesController.destroy')
})
// .middleware('userAccess')
// .middleware('permissionAccess')

/**
 * EndPoints de Menus
 */
Route.group(() => {
  Route.get('/menus', 'MenusController.index')
  Route.post('/menus', 'MenusController.store')
  Route.get('/menus/:id', 'MenusController.show')
  Route.put('/menus/:id', 'MenusController.update')
  Route.delete('/menus/:id', 'MenusController.destroy')
})
// .middleware('userAccess')
// .middleware('permissionAccess')

/**
 * EndPoints de Stock
 */
Route.group(() => {
  Route.get('/stocks', 'StockProductsController.index')
  Route.post('/stocks', 'StockProductsController.store')
  Route.get('/stocks/farmer/:id', 'StockProductsController.farmer')
  Route.get('/stocks/:id', 'StockProductsController.show')
  Route.put('/stocks/:id', 'StockProductsController.update')
  Route.delete('/stocks/:id', 'StockProductsController.destroy')
})
// .middleware('userAccess')
// .middleware('permissionAccess')


  // end point intemProduct

  Route.group(() => {
    Route.get('/itemsProducts', 'ItemsProductsController.index')
    Route.post('/itemsProducts', 'ItemsProductsController.store')
    Route.get('/itemsProducts/:id', 'ItemsProductsController.show')
    Route.put('/itemsProducts/:id', 'ItemsProductsController.update')
    Route.delete('/itemsProducts/:id', 'ItemsProductsController.destroy')

    Route.post('/itemsProducts/CreateOrder', 'ItemsProductsController.CreateOrder')
   

  })
