import { NestFactory } from "@nestjs/core";
import { program } from "commander";
import { AppModule } from "@/internal/app.module";

export const serveCommand = program.name("serve").action(async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000);
});
