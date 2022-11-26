import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
<<<<<<< HEAD
<<<<<<< HEAD
  protected tableName = 'permissionsRoles'
=======
  protected tableName = 'permissions_roles'
>>>>>>> main
=======

  protected tableName = 'permissionsRoles'
>>>>>>> 784c24a6638dd9fc1c74cad4302e06c52a65f9e6

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('idRol').unsigned().references('roles.id').onDelete('CASCADE')
      table.integer('idPermission').unsigned().references('permissions.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
