import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class ChangePasswordDto {

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    @IsString({ message: 'New password must be a string' })
    @IsNotEmpty({ message: 'New password is required' })
    newPassword!: string;

    @IsString({ message: 'Confirm password must be a string' })
    @IsNotEmpty({ message: 'Confirm password is required' })
    confirmPassword!: string;
}
