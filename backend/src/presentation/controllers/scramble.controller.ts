import { Body, Controller, Get, Headers, Logger, Post, Query } from "@nestjs/common";
import { CheckAnswerUseCase } from "src/application/use-cases/check-answer.usecase";
import { CreateSessionUseCase } from "src/application/use-cases/create-session.usecase";
import { GetScrambleUseCase } from "src/application/use-cases/get-scramble.usecase";
import { GetScrambleDto } from "../dto/get-scramble.dto";
import { CheckAnswerDto } from "../dto/check-answer.dto";
import { Throttle } from "@nestjs/throttler";
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from "@nestjs/swagger";
// import { GameSessionRepository } from "src/domain/repositories/game-session.repository";

@ApiTags('Scramble')
@Controller("scramble")
export class ScrambleController {
    private readonly logger = new Logger(ScrambleController.name);

    constructor(
        private readonly createSessionUseCase: CreateSessionUseCase,
        private readonly getScrambleUseCase: GetScrambleUseCase,
        private readonly checkAnswerUseCase: CheckAnswerUseCase,
    ) {}

    @Post('session')
    @ApiHeader({ name: 'user-id', required: true })
    async createSession(
        @Headers('user-id') userId: string,
    ) {
        this.logger.log('Creating new game session for user: ' + userId);
        const sessionId = await this.createSessionUseCase.execute(userId);
        return { sessionId };
    }

    @ApiHeader({ name: 'session-id', required: true })
    @ApiHeader({ name: 'user-id', required: true })
    @ApiQuery({name: 'difficulty', required: false, example: 'easy' })
    @Get()
    @Throttle({ default: { limit: 25, ttl: 60000 }})
    getScramble(
        @Headers('session-id') sessionId: string,
        @Headers('user-id') userId: string,
        @Query() query: GetScrambleDto
    ) {
        return this.getScrambleUseCase.execute(sessionId, query.difficulty);
    }

    @ApiHeader({ name: 'session-id', required: true })
    @ApiBody({ schema: { example: { answer: 'apple'}}})
    @Post('check')
    check(
        @Headers('session-id') sessionId: string,
        @Body() body: CheckAnswerDto
    ) {
        return this.checkAnswerUseCase.execute(sessionId,body.answer);
    }
}