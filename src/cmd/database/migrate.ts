import { Command } from "commander";

export const migrateUpCommand = new Command()
  .name("up")
  .description("Migrate database to the lastest migrations")
  .action(async () => {
    throw new Error("not implemented: migrate up");
  });

export const migrateDownCommand = new Command()
  .name("down")
  .description("Revert the previous applied migration")
  .action(async () => {
    throw new Error("not implemented: migrate down");
  });
