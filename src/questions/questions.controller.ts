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
    constructor(private readonly questionsService: QuestionsService,
        private readonly userService: UsersService,
    ) {}

    @Post()
    async create(
        @Body() createQuestionDto: CreateQuestionDto,
        @Request() req: any,
    ) {
        const user = await this.userService.findOne(req.user.id);
        return await this.questionsService.create(createQuestionDto, user);
    }

    @Get(':articleId')
    async findAll(@Param('articleId', ParseIntPipe) articleId: number) {
        return await this.questionsService.findAll(articleId);
    }

    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //     return await this.questionsService.findOne(id);
    // }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateQuestionDto: UpdateQuestionDto,
    ) {
        return await this.questionsService.update(id, updateQuestionDto);
    }

    // @Delete(':id')
    // async remove(@Param('id', ParseIntPipe) id: number) {
    //     return await this.questionsService.remove(id);
    // }
}
