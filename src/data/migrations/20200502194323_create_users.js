exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("phone", 16).notNullable();
    table.string("city", 255).notNullable();
    table.string("uf", 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
