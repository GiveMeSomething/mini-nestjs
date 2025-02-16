import { AppConfig } from "@/config/config";
import { APP_CONFIG } from "@/config/config.module";
import {
  createRedisClient,
  createRedisClusterClient,
  RawRedisConfig,
} from "@/config/redis";
import { Inject, Injectable } from "@nestjs/common";
import Redis, { Cluster } from "ioredis";

@Injectable()
export class RedisService {
  readonly rawConfig: RawRedisConfig;
  readonly redis: Redis | Cluster;

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig) {
    this.rawConfig = appConfig.redis;

    if (appConfig.redis.mode === "SINGLE") {
      const { data, error } = createRedisClient(this.rawConfig);
      if (error != null) {
        throw error;
      }
      this.redis = data;
    } else {
      const { data, error } = createRedisClusterClient(this.rawConfig);
      if (error != null) {
        throw error;
      }
      this.redis = data;
    }
  }
}
