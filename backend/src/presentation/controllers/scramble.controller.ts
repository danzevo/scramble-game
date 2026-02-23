import { Body, Controller, Get, Headers, Inject, Post, Query } from "@nestjs/common";
import { CheckAnswerUseCase } from "src/application/use-cases/check-answer.usecase";
import { CreateSessionUseCase } from "src/application/use-cases/create-session.usecase";
import { GetScrambleUseCase } from "src/application/use-cases/get-scramble.usecase";
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
    getScramble(
        @Headers('session-id') sessionId: string,
        @Query('difficulty') difficulty: string
    ) {
        return this.getScrambleUseCase.execute(sessionId, difficulty || "easy");
    }

    @Post('check')
    check(
        @Headers('session-id') sessionId: string,
        @Body() body: { answer: string }
    ) {
        return this.checkAnswerUseCase.execute(sessionId,body.answer);
    }
}