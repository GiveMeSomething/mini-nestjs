import { Result } from "@/types/result";
import { parse } from "@dotenvx/dotenvx";
import { IsNotEmpty, IsInt, validate } from "class-validator";
import { readFile } from "fs/promises";
import Redis, { Cluster } from "ioredis";

const REDIS_HOST_KEY = "REDIS_HOST";
const REDIS_PORT_KEY = "REDIS_PORT";
const REDIS_USERNAME_KEY = "REDIS_USER";
const REDIS_PASSWORD_KEY = "REDIS_PASSWORD";
const REDIS_MODE_KEY = "REDIS_MODE";

export type RedisMode = "SINGLE" | "CLUSTER";

const isValidRedisMode = (mode: string): mode is RedisMode => {
  return mode === "SINGLE" || mode === "CLUSTER";
};

export class RawRedisConfig {
  @IsNotEmpty()
  host: string;

  @IsInt()
  port: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  mode: RedisMode;

  constructor(
    host: string,
    port: number,
    username: string,
    password: string,
    mode: RedisMode,
  ) {
    this.host = host;
    this.port = port;

    this.username = username;
    this.password = password;

    this.mode = mode;
  }

  async validateConfig(): Promise<Error | undefined> {
    const errors = await validate(this);
    if (errors.length > 0) {
      return new Error(errors[0].toString());
    }

    if (!isValidRedisMode(this.mode)) {
      return new Error(`invalid redis mode: ${this.mode}`);
    }
  }

  static async from(
    configPath: string,
  ): Promise<Result<RawRedisConfig, Error>> {
    let configBuffer: Buffer | undefined;
    try {
      configBuffer = await readFile(configPath);
    } catch (error) {
      return { error: error as Error };
    }

    const config = parse(configBuffer);
    const redisConfig = new RawRedisConfig(
      config[REDIS_HOST_KEY] ?? "",
      Number(config[REDIS_PORT_KEY]),
      config[REDIS_USERNAME_KEY] ?? "",
      config[REDIS_PASSWORD_KEY] ?? "",
      config[REDIS_MODE_KEY] as RedisMode,
    );

    const validationErr = await redisConfig.validateConfig();
    if (validationErr != null) {
      return { error: new Error(validationErr.toString()) };
    }

    return { data: redisConfig };
  }
}

export const createRedisClient = (
  rawConfig: RawRedisConfig,
): Result<Redis, Error> => {
  if (rawConfig.mode === "CLUSTER") {
    return {
      error: new Error(
        `cannot create single Redis client when mode is ${rawConfig.mode}`,
      ),
    };
  }

  const client = new Redis({
    host: rawConfig.host,
    port: rawConfig.port,
    username: rawConfig.username,
    password: rawConfig.password,
  });

  return { data: client };
};

// TODO: Support multiple nodes definition later
export const createRedisClusterClient = (
  rawConfig: RawRedisConfig,
): Result<Cluster, Error> => {
  if (rawConfig.mode === "SINGLE") {
    return {
      error: new Error(
        `cannot create Redis Cluster client when mode is ${rawConfig.mode}`,
      ),
    };
  }

  const clusterClient = new Redis.Cluster(
    [
      {
        host: rawConfig.host,
        port: rawConfig.port,
      },
    ],
    {
      redisOptions: {
        username: rawConfig.username,
        password: rawConfig.password,
      },
    },
  );

  return { data: clusterClient };
};
