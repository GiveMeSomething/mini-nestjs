import { createDatabaseConfig } from "@/config/database";
import { Command } from "commander";

export const debugDatabaseCommand = new Command()
  .name("debug")
  .description("Print config + try to ping database once")
  .action(async () => {
    const config = await createDatabaseConfig();
    if (config.error != null) {
      throw config.error;
    }

    const { database, rawConfig } = config.data;
    console.log("[Debug] Database config:");
    console.log(rawConfig);

    // Test connection
    // This might throw err, but no need to catch
    await database.select("1");
  });
