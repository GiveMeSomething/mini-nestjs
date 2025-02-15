import { Command } from "commander";
import { databaseCommand } from "./cmd/database/database";
import { serverCommand } from "./cmd/server/server";

function bootstrap() {
  const program = new Command();
  const rootCmd = program
    .name("sg")
    .description("CLI for controlling singgov-assignment")
    .version("v0.1.0");

  rootCmd.addCommand(serverCommand);
  rootCmd.addCommand(databaseCommand);

  rootCmd.parse();
}

bootstrap();
