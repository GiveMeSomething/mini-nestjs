import { migrationConfig } from "@/config/knex";
import { AppModule } from "@/internal/app.module";
import { DatabaseService } from "@/internal/database/database.service";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { exit } from "process";

export const migrateUpCommand = new Command()
  .name("up")
  .description("Migrate database to the lastest migrations")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    await databaseService.database.migrate.up(migrationConfig);

    console.log("[Migrate] Database migrate up successfully");
    exit(0);
  });

export const migrateDownCommand = new Command()
  .name("down")
  .description("Revert the previous applied migration")
  .action(async () => {
    // TODO: Implement multiple down step
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    await databaseService.database.migrate.down(migrationConfig);

    console.log("[Migrate] Database migrate up successfully");
    exit(0);
  });

export const migrateCommand = new Command()
  .name("migrate")
  .addCommand(migrateUpCommand)
  .addCommand(migrateDownCommand);
