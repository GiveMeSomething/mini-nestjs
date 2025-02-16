import { AppModule } from "@/internal/app.module";
import { RedisService } from "@/internal/redis/redis.service";
import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { exit } from "process";

export const debugRedisCommand = new Command()
  .name("debug")
  .description("Display Redis configuration + test connection")
  .action(async () => {
    const app = await NestFactory.createApplicationContext(AppModule);
    const redisService = app.get(RedisService);

    console.log("[DEBUG] Redis config");
    console.log(redisService.rawConfig);

    console.log("[DEBUG] Pinging Redis node...");
    const result = await redisService.redis.ping();
    console.log(result);
    console.log("Redis connected");
    exit(0);
  });
