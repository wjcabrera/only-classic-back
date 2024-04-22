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
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Public()
    @Get('confirm-password')
    async confirmPassword(
        @Query('id', ParseIntPipe) id: number,
        @Query('hash') hash: string,
    ) {
        return await this.usersService.confirmPassword(id, hash);
    }

    @Public()
    @Get('confirm/:id')
    async confirm(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.confirm(id);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.findOne(id);
    }

    @Patch('/change-password')
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @Request() req: any,
    ) {
        return await this.usersService.changePassword(changePasswordDto, req.user.id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await this.usersService.remove(id);
    }
}
