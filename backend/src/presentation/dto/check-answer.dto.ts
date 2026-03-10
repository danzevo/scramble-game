import { IsString, Length } from "class-validator";

export class CheckAnswerDto {
    @IsString()
    @Length(1, 50)
    answer: string;
}