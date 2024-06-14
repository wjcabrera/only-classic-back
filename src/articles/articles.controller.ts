import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    ParseIntPipe,
    Request,
    UploadedFiles,
    UseInterceptors,
    StreamableFile,
    Res,
    Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { UsersService } from 'src/users/users.service';
import { Public } from '../common/decorators/public.decorator';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesService: ArticlesService,
        private readonly usersService: UsersService,
        private readonly attachmentsService: AttachmentsService,
    ) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files', 10))
    async create(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Body() createArticleDto: CreateArticleDto,
        @Request() req: any,
    ) {
        const user = await this.usersService.findOne(req.user.sub);
        const article = await this.articlesService.create(
            createArticleDto,
            user,
        );
        await this.attachmentsService.upload(files, { article_id: article.id });
        return article;
    }

    @Public()
    @Get('file')
    getFile(
        @Res({ passthrough: true }) res: Response,
        @Query('path') path: string,
    ) {
        const file = createReadStream(join(process.cwd(), 'uploads/', path));
        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Disposition': 'attachment; filename="image.jpg"',
        });
        return new StreamableFile(file);
    }

    @Public()
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.articlesService.findOne(id);
    }

    @Public()
    @Get()
    async findBySearch(
        @Query('search') search: string,
        @Query('category') category: number,
        @Query('location') location: string,
    ) {
        return await this.articlesService.findAllBySearch(
            search,
            category,
            location,
        );
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
