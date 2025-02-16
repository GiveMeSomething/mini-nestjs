import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { LoggerModule } from "nestjs-pino";
import { ConfigModule } from "@/config/config.module";
import { RedisModule } from "./redis/redis.module";

@Module({
  imports: [LoggerModule.forRoot(), RedisModule, DatabaseModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
