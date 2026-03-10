import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from "@nestjs/terminus";

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private db: TypeOrmHealthIndicator,
    ) {}

    @Get('live')
    live() {
        return { status: 'ok' };
    }

    @Get('ready')
    ready() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ])
    }
    
    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => this.db.pingCheck('database'),
        ])
    }
}