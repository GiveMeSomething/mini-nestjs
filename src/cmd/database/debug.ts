import { AppModule } from "@/internal/app.module";
import { DatabaseService } from "@/internal/database/database.service";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { exit } from "process";

export const debugDatabaseCommand = new Command()
  .name("debug")
  .description("Print config + try to ping database once")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    console.log("[DEBUG] Current database config:");
    console.log(databaseService.rawConfig);

    // Test database connection
    await databaseService.database.raw("SELECT 1");

    console.log("[DEBUG] Database connected.");
    exit(0);
  });
