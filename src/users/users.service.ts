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
import { ChangePasswordDto } from './dto/changePassword.dto';

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
        return await this.usersRepository
            .createQueryBuilder('user')
            .select([
                'user.id',
                'user.first_name',
                'user.last_name',
                'user.email',
                'user.is_active',
                'user.country',
                'user.address',
                'user.phone',
            ])
            .where('user.id = :id', { id })
            .andWhere('user.is_active = :isActive', { isActive: true })
            .getOneOrFail();
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

    async confirmPassword(id: number, hash: string) {
        return await this.usersRepository.update(id, { password: hash });
    }

    async getCurrentUser(request: Request) {
        return request.user;
    }

    async changePassword(changePasswordDto: ChangePasswordDto, id: number) {
        const user = await this.usersRepository.findOneOrFail({
            where: { id },
        });

        const isMatch = await bcrypt.compare(
            changePasswordDto.password,
            user.password,
        );

        if (!isMatch) {
            throw new Error('Password does not match');
        }

        if (
            changePasswordDto.newPassword !== changePasswordDto.confirmPassword
        ) {
            throw new Error('Passwords do not match');
        }

        const hash = await bcrypt.hash(
            changePasswordDto.newPassword,
            saltOrRounds.salt,
        );

        await this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Confirmación de cambio de contraseña',
                template: './confirmationChangePassword',
                context: {
                    name: user.first_name,
                    url: `http://localhost:3000/users/confirm-password?id=${user.id}&hash=${hash}`,
                },
            })
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async clear() {
        return await this.usersRepository.delete({});
    }
}
