import { Command } from "commander";
import { migrateDatabaseCommand } from "./migrate";
import { debugDatabaseCommand } from "./debug";
import { checkDatabaseStatusCommand } from "./status";

export const databaseCommand = new Command()
  .name("database")
  .description("interact with database")
  .addCommand(migrateDatabaseCommand)
  .addCommand(debugDatabaseCommand)
  .addCommand(checkDatabaseStatusCommand);
