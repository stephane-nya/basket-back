import "dotenv/config";

const config = {
  security: {
    password: {
      iterations: 100000,
      keylen: 256,
      digest: "sha512",
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
    },
  },
  server: {
    port: process.env.SERVER_PORT,
  },
  view: {
    results: {
      minLimit: 1,
      maxLimit: 20,
      defaultLimit: 10,

      resultsPerPage: 10,
    },
  },

  db: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: "./src/db/migrations",
      stub: "./src/db/migration.stub",
    },
  },
};

export default config;
