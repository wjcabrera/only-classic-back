import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
        private readonly articlesService: ArticlesService,
    ) {}

    async create(createQuestionDto: CreateQuestionDto, user: User) {
        const article = await this.articlesService.findOne(
            createQuestionDto.article_id,
        );

        return await this.questionsRepository.save({
            question: createQuestionDto.question,
            user,
            article,
        });
    }

    async findAll(articleID: number) {
        return await this.questionsRepository
            .createQueryBuilder('question')
            .where('question.article_id = :articleID', { articleID })
            .getMany();
    }

    async findOne(id: number) {
        return await this.questionsRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return await this.questionsRepository.update(id, {
            answer: updateQuestionDto.answer,
        });
    }

    async remove(id: number) {
        return await this.questionsRepository.delete(id);
    }
}
