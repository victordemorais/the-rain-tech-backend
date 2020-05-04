exports.up = function (knex) {
  return knex.schema.createTable("chats", function (table) {
    table.increments("id").primary();
    table.string("investor", 255).notNullable();
    table.string("professional", 255).notNullable();
    table.string("room", 255).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chats");
};
