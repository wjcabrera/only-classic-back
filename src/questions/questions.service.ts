import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private questionsRepository: Repository<Question>,
    ) {}

    async create(createQuestionDto: CreateQuestionDto) {
        return await this.questionsRepository.save(createQuestionDto);
    }

    async findAll() {
        return await this.questionsRepository.find();
    }

    async findOne(id: number) {
        return await this.questionsRepository.findOneByOrFail({ id });
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto) {
        return await this.questionsRepository.update(id, updateQuestionDto);
    }

    async remove(id: number) {
        return await this.questionsRepository.delete(id);
    }
}
