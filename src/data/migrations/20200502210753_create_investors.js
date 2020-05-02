exports.up = function (knex) {
  return knex.schema.createTable("investors", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("phone", 16).notNullable();
    table.string("city", 255).notNullable();
    table.string("uf", 2).notNullable();
    table.string("investor_profile", 255);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("professional_id", 255);

    table.unique("email");

    table.foreign("professional_id").references("professional.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("investors");
};
