import { Result } from "@/types/result";
import knex from "knex";
import { DatabaseConfig, RawDatabaseConfig } from "./database.type";
import { join } from "path";
import { cwd } from "process";

const DB_CONFIG_PATH = ".env";

export const createDatabaseConfig = async (): Promise<
  Result<DatabaseConfig, Error>
> => {
  const configPath = join(cwd(), DB_CONFIG_PATH);

  const { data: rawConfig, error } = await RawDatabaseConfig.from(configPath);
  if (error) {
    return { error };
  }

  const database = knex({
    client: "mysql",
    connection: {
      host: rawConfig.host,
      port: rawConfig.port,
      user: rawConfig.username,
      password: rawConfig.password,
      database: rawConfig.database,
    },
    pool: {
      min: 10,
      max: rawConfig.maxConn,
    },
    acquireConnectionTimeout: 10000,
  });

  return { data: { database: database, rawConfig } };
};
