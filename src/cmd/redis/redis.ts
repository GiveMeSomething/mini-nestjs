import { Command } from "commander";
import { debugRedisCommand } from "./debug";

export const redisCommand = new Command()
  .name("redis")
  .description("interact with Redis")
  .addCommand(debugRedisCommand);
