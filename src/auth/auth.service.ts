import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/singIn.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneBy(signInDto.email);
        if (!user) {
            throw new BadRequestException({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);
        console.log(isPasswordValid, 'isPasswordValid');
        console.log(signInDto.password, 'signInDto.password');
        console.log(user.password, 'user.password');
        if (!await bcrypt.compare(signInDto.password, user.password)) {
            throw new BadRequestException({ message: 'Invalid password' });
        }
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
