exports.up = function (knex) {
  return knex.schema.createTable("professionals", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("phone", 16).notNullable();
    table.string("city", 255).notNullable();
    table.string("uf", 2).notNullable();
    table.string("investor_profile", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.unique("email");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("professional");
};
