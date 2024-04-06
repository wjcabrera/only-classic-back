import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { saltOrRounds } from '../shared/constants/saltOrRounds.constants';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly mailerService: MailerService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const hash = await bcrypt.hash(
            createUserDto.password,
            saltOrRounds.salt,
        );

        const user = await this.usersRepository.save({
            ...createUserDto,
            password: hash,
        });

        await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Bienvenido a Only Classics',
                template: './confirmation',
                context: {
                    name: user.first_name,
                    url: 'http://localhost:3000/users/confirm/' + user.id,
                },
            })
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });

        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number) {
        return await this.usersRepository.findOneByOrFail({ id });
    }

    async findOneBy(email: string) {
        return await this.usersRepository.findOneBy({ email });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.usersRepository.update(id, updateUserDto);
    }

    async remove(id: number) {
        return await this.usersRepository.delete(id);
    }

    async confirm(id: number) {
        return await this.usersRepository.update(id, { is_active: true });
    }

    async getCurrentUser(request: Request) {
        return request.user;
    }
}
