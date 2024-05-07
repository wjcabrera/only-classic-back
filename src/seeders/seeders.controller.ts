import { Body, Controller, Post } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateSeederDto } from './dto/create-seeder.dto';

@Controller('seeders')
export class SeedersController {
    constructor(private readonly seedersService: SeedersService) {}

    @Public()
    @Post()
    create(@Body() createSeederDto: CreateSeederDto) {
        return this.seedersService.create(createSeederDto);
    }
}
