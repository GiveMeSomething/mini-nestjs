import { AppConfig } from "@/config/config";
import { APP_CONFIG } from "@/config/config.module";
import { AppModule } from "@/internal/app.module";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";

export const debugServerCommand = new Command()
  .name("debug")
  .description("Display server config")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const appConfig = app.get<AppConfig>(APP_CONFIG);

    console.log("[DEBUG] Server config:");
    console.log(appConfig.server);
  });
