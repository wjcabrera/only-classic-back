import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { RoleEnum } from 'src/shared/enums/role.enum';

export class CreateUserDto {
    @IsString({ message: 'Name must be a string' })
    @IsNotEmpty({ message: 'Name is required' })
    first_name!: string;

    @IsString({ message: 'Last name must be a string' })
    @IsNotEmpty({ message: 'Last name is required' })
    last_name!: string;

    @IsEmail({}, { message: 'Invalid email' })
    @IsNotEmpty({ message: 'Email is required' })
    email!: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password!: string;

    @IsString({ message: 'Address must be a string' })
    @IsOptional()
    address?: string;

    @IsString({ message: 'Phone must be a string' })
    @IsOptional()
    phone?: string;

    @IsString({ message: 'Country must be a string' })
    @IsOptional()
    country?: string;

    @IsString({ message: 'Identification must be a string' })
    @IsOptional()
    identification?: string;

    @IsEnum(RoleEnum, { message: 'Invalid role' })
    @IsOptional()
    role?: RoleEnum;
}
