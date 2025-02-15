import { RawDatabaseConfig } from "./database";
import { RawServerConfig } from "./server";

export interface AppConfig {
  server: RawServerConfig;
  database: RawDatabaseConfig;
}
