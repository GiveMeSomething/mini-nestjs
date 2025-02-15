import { createKnexClient, RawDatabaseConfig } from "@/config/database";
import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { APP_CONFIG } from "../app.module";
import { AppConfig } from "@/config/config";

@Injectable()
export class DatabaseService {
  rawConfig: RawDatabaseConfig;
  database: Knex;

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig) {
    this.rawConfig = appConfig.database;
    this.database = createKnexClient(appConfig.database);
  }
}
