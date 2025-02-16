import { migrationConfig } from "@/config/knex";
import { AppModule } from "@/internal/app.module";
import { DatabaseService } from "@/internal/database/database.service";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { exit } from "process";

type KnexMigrationList = Array<{ name: string }>;

export const checkDatabaseStatusCommand = new Command()
  .name("status")
  .description("Display status of database")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const databaseService = app.get(DatabaseService);

    const version =
      await databaseService.database.migrate.status(migrationConfig);
    console.log(`[DEBUG] Database version: ${version}`);

    const migrationLists = (await databaseService.database.migrate.list(
      migrationConfig,
    )) as Array<KnexMigrationList>;
    if (migrationLists.length !== 2) {
      throw new Error("[Database Status] Unexpected list result");
    }

    const applied = migrationLists[0].map(
      (migration: { name: string }) => migration.name,
    );
    console.log("[DEBUG] Applied migrations", applied);

    const pending = migrationLists[1].map(
      (migration: { name: string }) => migration.name,
    );
    console.log("[DEBUG] Pending migrations", pending);

    exit(0);
  });
