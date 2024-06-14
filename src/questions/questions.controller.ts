import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    Request,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { UsersService } from 'src/users/users.service';

@Controller('questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    async create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Request() req: any,
    ) {
        const user = await this.usersService.findOne(req.user.sub);
        return await this.questionsService.create(createQuestionDto, user);
    }

    @Get(':articleId')
    async findAll(@Param('articleId', ParseIntPipe) articleId: number) {
        return await this.questionsService.findAll(articleId);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return await this.questionsService.update(id, updateQuestionDto);
    }
}
