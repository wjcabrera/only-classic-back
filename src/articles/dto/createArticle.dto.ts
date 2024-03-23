import {
    IsDate,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Min,
} from 'class-validator';
import { CurrencyEnum } from 'src/shared/enums/currency.enum';

export class CreateArticleDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title!: string;

    @IsNotEmpty({ message: 'Brand is required' })
    @IsString({ message: 'Brand must be a string' })
    brand!: string;

    @IsNotEmpty({ message: 'Model is required' })
    @IsString({ message: 'Model must be a string' })
    model!: string;

    @IsNotEmpty({ message: 'Year is required' })
    @IsInt({ message: 'Year must be a number' })
    @Min(1800, { message: 'Year must be greater than 1900' })
    year!: number;

    @IsNotEmpty({ message: 'Category is required' })
    @IsInt({ message: 'Category must be a number' })
    @IsPositive({ message: 'Category must be a positive number' })
    category_id!: number;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: 'Description must be a string' })
    description: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })
    price!: number;

    @IsNotEmpty({ message: 'Currency is required' })
    @IsEnum(CurrencyEnum, { message: 'Currency must be a valid value' })
    currency!: string;

    @IsNotEmpty({ message: 'Location is required' })
    @IsString({ message: 'Location must be a string' })
    location!: string;
}
