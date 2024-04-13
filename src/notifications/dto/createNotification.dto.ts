import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    message: string;
}
