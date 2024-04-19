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
        const user = await this.usersService.findOne(req.user.id);
        const article = await this.articlesService.create(
            createArticleDto,
            user,
        );
        await this.attachmentsService.upload(files, { article_id: article.id });
        return article;
    }

    @Public()
    @Get('file')
    getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
        const file = createReadStream(join(process.cwd(), 'uploads/14/4.jpg'));
        res.set({
            'Content-Type': 'image/jpeg',
            'Content-Disposition': 'attachment; filename="4.jpg"',
        });
        return new StreamableFile(file);
    }

    @Public()
    @Get(':search')
    async findBySearch(@Param('search') search: string) {
        return await this.articlesService.findAllBySearch(search);
    }

    @Public()
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
