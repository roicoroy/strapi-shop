const { parse } = require("pg-connection-string");

export default ({ env }) => {
  const { host, port, database, user, password } = parse(env("DATABASE_URL"));

  return {
    connection: {
      client: "postgres",
      connection: {
        host,
        port,
        database,
        user,
        password,
        schema: env("DATABASE_SCHEMA"),
        ssl: env.bool("DATABASE_SSL"),
      },
      ssl: {
        rejectUnauthorized: false
      },
      debug: false,
    },
  };
};
