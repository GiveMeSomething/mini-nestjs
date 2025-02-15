import { Result } from "@/types/result";
import { parse } from "@dotenvx/dotenvx";
import {
  IsNotEmpty,
  IsInt,
  Min,
  ValidationError,
  validate,
} from "class-validator";
import { readFile } from "fs/promises";
import knex, { Knex } from "knex";

const DB_HOST_KEY = "DB_HOST";
const DB_PORT_KEY = "DB_PORT";
const DB_USERNAME_KEY = "DB_USER";
const DB_PASSWORD_KEY = "DB_PASSWORD";
const DB_DATABASE_KEY = "DB_DATABASE";
const DB_MAX_CONN_KEY = "DB_POOL_MAX_CONNS";

export interface DatabaseConfig {
  rawConfig: RawDatabaseConfig;
  database: Knex;
}

export class RawDatabaseConfig {
  @IsNotEmpty()
  host: string;

  @IsInt()
  port: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  database: string;

  @IsInt()
  @Min(10)
  maxConn: number;

  constructor(
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    maxConn = 100,
  ) {
    this.host = host;
    this.port = port;

    this.username = username;
    this.password = password;

    this.database = database;
    this.maxConn = maxConn;
  }

  async validateConfig(): Promise<ValidationError | undefined> {
    const errors = await validate(this);
    if (!errors.length) {
      return;
    }
    return errors[0];
  }

  static async from(
    configPath: string,
  ): Promise<Result<RawDatabaseConfig, Error>> {
    let configBuffer: Buffer | undefined;
    try {
      configBuffer = await readFile(configPath);
    } catch (error) {
      return { error: error as Error };
    }

    const config = parse(configBuffer);
    const databaseConfig = new RawDatabaseConfig(
      config[DB_HOST_KEY] ?? "",
      Number(config[DB_PORT_KEY]),
      config[DB_USERNAME_KEY] ?? "",
      config[DB_PASSWORD_KEY] ?? "",
      config[DB_DATABASE_KEY] ?? "",
      Number(config[DB_MAX_CONN_KEY]),
    );

    const validationErr = await databaseConfig.validateConfig();
    if (validationErr != null) {
      return { error: new Error(validationErr.toString()) };
    }

    return { data: databaseConfig };
  }
}

export const createKnexClient = (rawConfig: RawDatabaseConfig): Knex => {
  return knex({
    client: "mysql2",
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
};
