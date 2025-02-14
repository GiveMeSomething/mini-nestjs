import { Command } from "commander";
import { migrateDownCommand, migrateUpCommand } from "./migrate";
import { debugDatabaseCommand } from "./debug";

export const databaseCommand = new Command()
  .name("database")
  .description("Commands to interact with database")
  .addCommand(migrateUpCommand)
  .addCommand(migrateDownCommand)
  .addCommand(debugDatabaseCommand);
