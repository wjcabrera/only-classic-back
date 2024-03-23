import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty({ message: 'Question is required' })
    @IsString({ message: 'Question must be a string' })
    question!: string;

    @IsNumber({}, { message: 'Article id must be a number' })
    @IsNotEmpty({ message: 'Article id is required' })
    article_id!: number;
}
