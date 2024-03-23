import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.save(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOneByOrFail({ id });
    }

    async findOneBy(email: string) {
        return await this.usersRepository.findOneByOrFail({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.usersRepository.delete(id);
    }
}
