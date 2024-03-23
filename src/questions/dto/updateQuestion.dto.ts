import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @IsNumber({}, { message: 'id must be a number' })
    @IsNotEmpty({ message: 'id is required' })
    id!: number;

    @IsString({ message: 'Answer must be a string' })
    @IsNotEmpty({ message: 'Answer is required' })
    answer!: string;
}
