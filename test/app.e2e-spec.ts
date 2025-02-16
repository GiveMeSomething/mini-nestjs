import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { App } from "supertest/types";
import { AppModule } from "@/internal/app.module";
import { agent } from "supertest";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await module.close();
  });

  it("/health_check (GET)", () => {
    return agent(app.getHttpServer())
      .get("/health_check")
      .expect(200)
      .expect("healthy");
  });
});
