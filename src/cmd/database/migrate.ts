import { program } from "commander";

export const migrateUp = program
  .name("up")
  .description("Migrate database to the lastest migrations")
  .action(async () => {});
