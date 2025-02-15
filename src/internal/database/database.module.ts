import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { RawDatabaseConfig } from "@/config/database";
import { DB_CONFIG_PATH } from "@/const/app.const";
import { TeacherDatastore } from "./teacher.datastore";

@Module({
  providers: [
    {
      provide: DatabaseService,
      useFactory: async () => {
        const { data: rawConfig, error } =
          await RawDatabaseConfig.from(DB_CONFIG_PATH);
        if (error) {
          return { error };
        }
        return new DatabaseService(rawConfig);
      },
    },
    TeacherDatastore,
  ],
  exports: [DatabaseService, TeacherDatastore],
})
export class DatabaseModule {}
