import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { Attachment } from './entities/attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/entities/article.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
    controllers: [AttachmentsController],
    providers: [AttachmentsService, ArticlesService, CategoriesService],
    imports: [TypeOrmModule.forFeature([Attachment, Article, Category])],
})
export class AttachmentsModule {}
