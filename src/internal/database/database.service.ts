import { createKnexClient, RawDatabaseConfig } from "@/config/database";
import { Injectable } from "@nestjs/common";
import { Knex } from "knex";

@Injectable()
export class DatabaseService {
  rawConfig: RawDatabaseConfig;
  database: Knex;

  constructor(rawConfig: RawDatabaseConfig) {
    this.rawConfig = rawConfig;
    this.database = createKnexClient(rawConfig);
  }
}
