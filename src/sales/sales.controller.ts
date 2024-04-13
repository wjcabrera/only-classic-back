import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/createSale.dto';
import { UpdateSaleDto } from './dto/updateSale.dto';
import { UsersService } from 'src/users/users.service';

@Controller('sales')
export class SalesController {
    constructor(
        private readonly salesService: SalesService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    async create(@Body() createSaleDto: CreateSaleDto, @Request() req: any) {
        const user = await this.usersService.findOne(req.user.id);
        return this.salesService.create(createSaleDto, user);
    }

    @Get()
    async findAll(@Request() req: any) {
        return await this.salesService.findAll(req.user.sub);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
        return this.salesService.update(+id, updateSaleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.salesService.remove(+id);
    }
}
