// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/data/db.sqlite",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/data/migrations",
    },
  },
};
