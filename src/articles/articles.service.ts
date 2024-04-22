import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository } from 'typeorm';
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

    async findAllBySearch(search: string, category: number, location: string) {
        return await this.articlesRepository.createQueryBuilder('article')
            .innerJoinAndSelect('article.attachments', 'attachments')
            .where('article.state = :state', { state: StateArticleEnum.ENABLED })
            .andWhere(
                new Brackets((qb) => {
                    if (search) {
                        qb.where('(article.title LIKE :search OR article.description LIKE :search)', { search: `%${search}%` });
                    }
                    if (category) {
                        qb.andWhere('article.category_id = :category', { category });
                    }
                    if (location) {
                        qb.andWhere('article.location LIKE :location', { location: `%${location}%` });
                    }
                }
            )).getMany().then((articles) => {
                return articles.map((article) => {
                    return {
                        ...article,
                        image: `${article.id}/${article.attachments[0].id}.${article.attachments[0].ext}`,
                    }
                });
            });
    }

    async findOne(id: number) {
        try {
            return await this.articlesRepository.createQueryBuilder('article')
                .innerJoinAndSelect('article.attachments', 'attachments')
                .where('article.state = :state', { state: StateArticleEnum.ENABLED })
                .andWhere('article.id = :id', { id })
                .getOneOrFail().then((article) => {
                    return {
                        ...article,
                        images: article.attachments.map((attachment) => {
                            return `${article.id}/${attachment.id}.${attachment.ext}`;
                        }),
                    }
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
