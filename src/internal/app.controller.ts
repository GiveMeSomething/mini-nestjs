import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { TeacherDatastore } from "./database/teacher.datastore";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly teacherService: TeacherDatastore,
  ) {}

  @Get()
  getHello(): string {
    this.teacherService.testQuery();
    return this.appService.getHello();
  }
}
