import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { Attachment } from 'src/attachments/entities/attachment.entity';

@Module({
    controllers: [ArticlesController],
    providers: [
        ArticlesService,
        CategoriesService,
        UsersService,
        AttachmentsService,
    ],
    imports: [TypeOrmModule.forFeature([Article, Category, User, Attachment])],
})
export class ArticlesModule {}
