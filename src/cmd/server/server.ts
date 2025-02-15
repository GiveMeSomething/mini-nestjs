import { Command } from "commander";
import { serveCommand } from "./serve";
import { debugServerCommand } from "./debug";

export const serverCommand = new Command()
  .name("sg")
  .description("interact with server")
  .addCommand(serveCommand)
  .addCommand(debugServerCommand);
