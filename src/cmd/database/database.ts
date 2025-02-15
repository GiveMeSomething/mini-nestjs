import { Command } from "commander";
import { migrateCommand } from "./migrate";
import { debugDatabaseCommand } from "./debug";

export const databaseCommand = new Command()
  .name("database")
  .description("interact with database")
  .addCommand(migrateCommand)
  .addCommand(debugDatabaseCommand);
