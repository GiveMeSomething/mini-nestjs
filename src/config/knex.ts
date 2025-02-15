import type { Knex } from "knex";
import { join } from "path";
import { cwd } from "process";

import { DB_CONFIG_PATH } from "../const/app.const";
import { RawDatabaseConfig } from "./database";

const MIGRATION_FOLDER = "src/cmd/database/migrations/";

export const migrationConfig = {
  directory: join(cwd(), MIGRATION_FOLDER),
  tableName: "knex_migrations",
};

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql2",
    connection: async () => {
      const configResult = await RawDatabaseConfig.from(DB_CONFIG_PATH);
      if (configResult.error != null) {
        throw configResult.error;
      }

      const rawConfig = configResult.data;

      return {
        host: rawConfig.host,
        port: rawConfig.port,
        user: rawConfig.username,
        password: rawConfig.password,
        database: rawConfig.database,
      };
    },

    migrations: migrationConfig,
  },
};

export default knexConfig;
