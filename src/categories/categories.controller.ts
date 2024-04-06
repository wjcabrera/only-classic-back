import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.categoriesService.findOne(id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateCategoryDto: UpdateCategoryDto,
    // ) {
    //     return this.categoriesService.update(id, updateCategoryDto);
    // }

    // @Patch('delete/:id')
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     return this.categoriesService.remove(id);
    // }
}
