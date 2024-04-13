import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/entities/article.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

@Module({
    controllers: [QuestionsController],
    providers: [
        QuestionsService,
        UsersService,
        ArticlesService,
        CategoriesService,
    ],
    imports: [TypeOrmModule.forFeature([Question, User, Article, Category])],
})
export class QuestionsModule {}
