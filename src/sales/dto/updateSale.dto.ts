import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './createSale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
