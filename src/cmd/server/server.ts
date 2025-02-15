import { Command } from "commander";
import { serveCommand } from "./serve";
import { debugServerCommand } from "./debug";

export const sgCommand = new Command()
  .name("sg")
  .addCommand(serveCommand)
  .addCommand(debugServerCommand);
