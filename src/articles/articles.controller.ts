import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    async create(@Body() createArticleDto: CreateArticleDto) {
        return await this.articlesService.create(createArticleDto);
    }

    @Get()
    async findAll() {
        return await this.articlesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateArticleDto: UpdateArticleDto,
    ) {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Patch('delete/:id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesService.remove(id);
    }
}
