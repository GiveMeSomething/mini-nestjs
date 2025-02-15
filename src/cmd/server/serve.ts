import { NestFactory } from "@nestjs/core";
import { Command } from "commander";
import { AppModule } from "@/internal/app.module";

export const serveCommand = new Command().name("serve").action(async () => {
  const app = await NestFactory.create(AppModule);

  await app.listen(8000);
});
