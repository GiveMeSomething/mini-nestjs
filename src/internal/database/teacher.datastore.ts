import { Injectable } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { Knex } from "knex";

@Injectable()
export class TeacherDatastore {
  private readonly database: Knex;

  constructor(databaseService: DatabaseService) {
    this.database = databaseService.database;
  }

  async testQuery() {
    await this.database.select("1");
  }
}
