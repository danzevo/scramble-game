import { IsEnum, IsOptional } from "class-validator";

export enum difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard',
}

export class GetScrambleDto {
    @IsOptional()
    @IsEnum(difficulty)
    difficulty?: difficulty = difficulty.EASY;
}