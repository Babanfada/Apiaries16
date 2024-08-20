const config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  production: {
    username: process.env.DB_USERNAME_R || "root",
    password: process.env.DB_PASSWORD_R || null,
    database: process.env.DB_DATABASE_R || "database_production",
    host: process.env.DB_HOST_R || "127.0.0.1",
    dialect: process.env.DB_DIALECT_R || "mysql",
  },
};

module.exports = config;
