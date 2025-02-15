import { Result } from "@/types/result";
import { Undefinable } from "@/types/util";
import { parse } from "@dotenvx/dotenvx";
import { IsInt, IsNotEmpty, Max, Min, validate } from "class-validator";
import { readFile } from "fs/promises";

const APP_MODE_KEY = "APP_MODE";
const APP_PORT_KEY = "APP_PORT";

export type AppMode = "DEVELOPMENT" | "PRODUCTION" | "MAINTENANCE";

export const isAppMode = (input: string): input is AppMode => {
  return (
    input === "DEVELOPMENT" || input === "PRODUCTION" || input === "MAINTENANCE"
  );
};

export class RawServerConfig {
  @IsNotEmpty()
  mode: AppMode;

  @IsInt()
  @Min(1)
  @Max(65_535)
  port: number;

  constructor(mode: AppMode, port: number) {
    this.mode = mode;
    this.port = port;
  }

  async validateConfig(): Promise<Undefinable<Error>> {
    const errors = await validate(this);
    if (!errors.length) {
      return;
    }

    if (!isAppMode(this.mode)) {
      return new Error(`invalid app mode: ${this.mode}`);
    }
    return new Error(errors[0].toString());
  }

  static async from(
    configPath: string,
  ): Promise<Result<RawServerConfig, Error>> {
    let configBuffer: Buffer | undefined;
    try {
      configBuffer = await readFile(configPath);
    } catch (error) {
      return { error: error as Error };
    }

    const config = parse(configBuffer);
    const serverConfig = new RawServerConfig(
      config[APP_MODE_KEY] as AppMode,
      Number(config[APP_PORT_KEY]),
    );

    const validationErr = await serverConfig.validateConfig();
    if (validationErr != null) {
      return { error: new Error(validationErr.toString()) };
    }

    return { data: serverConfig };
  }
}
