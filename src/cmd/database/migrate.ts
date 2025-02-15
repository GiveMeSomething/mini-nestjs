import { migrationConfig } from "@/config/knex";
import { AppModule } from "@/internal/app.module";
import { DatabaseService } from "@/internal/database/database.service";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { exit } from "process";

export const migrateUpCommand = new Command()
  .name("up")
  .description("migrate database up 1 version")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    await databaseService.database.migrate.up(migrationConfig);

    console.log("[Migrate] Database migrate up successfully");
    exit(0);
  });

export const migrateDownCommand = new Command()
  .name("down")
  .description("migrate database down 1 version")
  .action(async () => {
    // TODO: Implement multiple down step
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    await databaseService.database.migrate.down(migrationConfig);

    console.log("[Migrate] Database migrate up successfully");
    exit(0);
  });

export const migrateAutoCommand = new Command()
  .name("auto")
  .description("migrate database to the latest migrations")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    await databaseService.database.migrate.latest(migrationConfig);

    console.log("[Migrate] Database migrate up successfully");
    exit(0);
  });

export const migrateDatabaseCommand = new Command()
  .name("migrate")
  .addCommand(migrateUpCommand)
  .addCommand(migrateDownCommand)
  .addCommand(migrateAutoCommand);
