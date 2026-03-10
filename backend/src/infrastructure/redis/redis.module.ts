import { Module } from "@nestjs/common";
import Redis from "ioredis";

@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: 'redis', //service name in docker-compose
                    port: 6379,
                })
            }
        }
    ],
    exports: ['REDIS_CLIENT']
})
export class RedisModule {}