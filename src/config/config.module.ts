import { SERVER_CONFIG_PATH, DB_CONFIG_PATH } from "@/const/app.const";
import { Module } from "@nestjs/common";
import { AppConfig } from "./config";
import { RawDatabaseConfig } from "./database";
import { RawServerConfig } from "./server";

export const APP_CONFIG = "APP_CONFIG";

@Module({
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: async (): Promise<AppConfig> => {
        const serverConfigResult =
          await RawServerConfig.from(SERVER_CONFIG_PATH);
        if (serverConfigResult.error != null) {
          throw serverConfigResult.error;
        }

        const databaseConfigResult =
          await RawDatabaseConfig.from(DB_CONFIG_PATH);
        if (databaseConfigResult.error != null) {
          throw databaseConfigResult.error;
        }

        return {
          server: serverConfigResult.data,
          database: databaseConfigResult.data,
        };
      },
    },
  ],
  exports: [APP_CONFIG],
})
export class ConfigModule {}
