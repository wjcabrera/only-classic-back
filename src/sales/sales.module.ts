import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { User } from 'src/users/entities/user.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/entities/article.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
    controllers: [SalesController],
    providers: [SalesService, UsersService, ArticlesService, CategoriesService],
    imports: [TypeOrmModule.forFeature([Sale, User, Article, Category])],
})
export class SalesModule {}
