import { Body, Controller, Get, Headers, Inject, Post, Query } from "@nestjs/common";
import { CheckAnswerUseCase } from "src/application/use-cases/check-answer.usecase";
import { CreateSessionUseCase } from "src/application/use-cases/create-session.usecase";
import { GetScrambleUseCase } from "src/application/use-cases/get-scramble.usecase";
import { GetScrambleDto } from "../dto/get-scramble.dto";
import { CheckAnswerDto } from "../dto/check-answer.dto";
import { Throttle } from "@nestjs/throttler";
// import { GameSessionRepository } from "src/domain/repositories/game-session.repository";

@Controller("scramble")
export class ScrambleController {
    constructor(
        private readonly createSessionUseCase: CreateSessionUseCase,
        private readonly getScrambleUseCase: GetScrambleUseCase,
        private readonly checkAnswerUseCase: CheckAnswerUseCase,
    ) {}

    @Get('session')
    createSession() {
        return this.createSessionUseCase.execute();
    }

    @Get()
    @Throttle({ default: { limit: 25, ttl: 60000 }})
    getScramble(
        @Headers('session-id') sessionId: string,
        @Query() query: GetScrambleDto
    ) {
        return this.getScrambleUseCase.execute(sessionId, query.difficulty);
    }

    @Post('check')
    check(
        @Headers('session-id') sessionId: string,
        @Body() body: CheckAnswerDto
    ) {
        return this.checkAnswerUseCase.execute(sessionId,body.answer);
    }
}