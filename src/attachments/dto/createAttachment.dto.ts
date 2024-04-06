import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAttachmentDto {
    @IsInt({ message: 'article_id must be an integer' })
    @IsNotEmpty({ message: 'article_id is required' })
    @IsPositive({ message: 'article_id must be a positive integer' })
    article_id!: number;
}
