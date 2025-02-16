import { RawDatabaseConfig } from "./database";
import { RawRedisConfig } from "./redis";
import { RawServerConfig } from "./server";

export interface AppConfig {
  server: RawServerConfig;
  database: RawDatabaseConfig;
  redis: RawRedisConfig;
}
