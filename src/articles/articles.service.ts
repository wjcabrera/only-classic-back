import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateArticleEnum } from 'src/shared/enums/stateArticle.enum';
import { CategoriesService } from 'src/categories/categories.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
        private readonly categoriesService: CategoriesService,
    ) {}

    async create(createArticleDto: CreateArticleDto, user: User) {
        const category = await this.categoriesService.findOne(
            createArticleDto.category_id,
        );

        return await this.articlesRepository.save({
            ...createArticleDto,
            category,
            user,
            state: StateArticleEnum.ENABLED,
        });
    }

    async findAll() {
        return await this.articlesRepository.findBy({
            state: StateArticleEnum.ENABLED,
        });
    }

    async findOne(id: number) {
        try {
            return await this.articlesRepository.findOneByOrFail({
                id,
                state: StateArticleEnum.ENABLED,
            });
        } catch (error) {
            throw new BadRequestException('Article not found');
        }
    }

    async update(id: number, updateArticleDto: UpdateArticleDto) {
        return await this.articlesRepository.update(id, updateArticleDto);
    }

    async remove(id: number) {
        return await this.articlesRepository.update(id, {
            state: StateArticleEnum.SLOW,
        });
    }
}
