import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./database/database.module";
import { LoggerModule } from "nestjs-pino";
import { ConfigModule } from "@/config/config.module";

@Module({
  imports: [LoggerModule.forRoot(), DatabaseModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
