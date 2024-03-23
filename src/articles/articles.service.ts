import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StateArticleEnum } from 'src/shared/enums/stateArticle.enum';

@Injectable()
export class ArticlesService {
    constructor(
        @InjectRepository(Article)
        private articlesRepository: Repository<Article>,
    ) {}

    async create(createArticleDto: CreateArticleDto) {
        return await this.articlesRepository.save({
            ...createArticleDto,
            state: StateArticleEnum.ENABLED,
        });
    }

    async findAll() {
        return await this.articlesRepository.findBy({
            state: StateArticleEnum.ENABLED,
        });
    }

    async findOne(id: number) {
        return await this.articlesRepository.findOneByOrFail({
            id,
            state: StateArticleEnum.ENABLED,
        });
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
