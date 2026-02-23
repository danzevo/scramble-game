import { Body, Controller, Get, Headers, Post, Query } from "@nestjs/common";
import { CheckAnswerUseCase } from "src/application/use-cases/check-answer.usecase";
import { GetScrambleUseCase } from "src/application/use-cases/get-scramble.usecase";
import { WordRepositoryImpl } from "src/infrastructure/database/typeorm/word.repository.impl";
import { GameSessionStore } from "src/infrastructure/game-session.store";

@Controller("scramble")
export class ScrambleController {
    constructor(
        private wordRepo: WordRepositoryImpl
    ) {}

    @Get('session')
    createSession() {
        const sessionId = GameSessionStore.createSession();
        return { sessionId}
    }

    @Get()
    getScramble(
        @Headers('session-id') sessionId: string,
        @Query('difficulty') difficulty: string
    ) {
        const useCase = new GetScrambleUseCase(this.wordRepo);
        return useCase.execute(sessionId, difficulty || "easy");
    }

    @Post('check')
    check(
        @Headers('session-id') sessionId: string,
        @Body() body: { answer: string }
    ) {
        const useCase = new CheckAnswerUseCase();
        return useCase.execute(sessionId,body.answer);
    }
}