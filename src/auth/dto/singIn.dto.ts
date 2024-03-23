import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}
