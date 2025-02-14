import { Command } from "commander";
import { serveCommand } from "./cmd/server/serve";
import { databaseCommand } from "./cmd/database/database";

function bootstrap() {
  const program = new Command();
  const rootCmd = program
    .name("sg")
    .description("CLI for controlling singgov-assignment")
    .version("v0.1.0");

  rootCmd.addCommand(serveCommand);
  rootCmd.addCommand(databaseCommand);

  rootCmd.parse();
}

bootstrap();
