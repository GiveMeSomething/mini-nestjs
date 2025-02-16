import { createKnexClient, RawDatabaseConfig } from "@/config/database";
import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { AppConfig } from "@/config/config";
import { APP_CONFIG } from "@/config/config.module";

@Injectable()
export class DatabaseService {
  readonly rawConfig: RawDatabaseConfig;
  readonly database: Knex;

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig) {
    this.rawConfig = appConfig.database;
    this.database = createKnexClient(appConfig.database);
  }
}
