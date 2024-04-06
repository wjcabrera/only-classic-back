import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @IsString({ message: 'Answer must be a string' })
    @IsNotEmpty({ message: 'Answer is required' })
    answer!: string;
}
