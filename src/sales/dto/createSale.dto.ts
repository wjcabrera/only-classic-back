import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { DeliveryMethodEnum } from 'src/shared/enums/deliveryMethod.enum';
import { PaymentMethodEnum } from 'src/shared/enums/paymentMethod.enum';

export class CreateSaleDto {
    @IsNotEmpty({ message: 'Currency is required' })
    @IsEnum(PaymentMethodEnum, {
        message: 'Payment method must be a valid value',
    })
    payment_method!: string;

    @IsNotEmpty({ message: 'Delivery method is required' })
    @IsEnum(DeliveryMethodEnum, {
        message: 'Delivery method must be a valid value',
    })
    delivery_method!: string;

    @IsNotEmpty({ message: 'Article id is required' })
    @IsNumber({}, { message: 'Article id must be a number' })
    article_id!: number;
}
