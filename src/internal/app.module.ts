import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { LoggerModule } from "nestjs-pino";
import { AppConfig } from "@/config/config";
import { RawServerConfig } from "@/config/server";
import { DB_CONFIG_PATH, SERVER_CONFIG_PATH } from "@/const/app.const";
import { RawDatabaseConfig } from "@/config/database";

export const APP_CONFIG = "APP_CONFIG";

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule],
  controllers: [AppController],
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
})
export class AppModule {}
