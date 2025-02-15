import { Controller, Get, HttpCode } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get("health_check")
  @HttpCode(200)
  healthCheck() {
    return "healthy";
  }
}
