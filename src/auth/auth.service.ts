import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/singIn.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findOneBy(signInDto.email);
        if (user?.password !== signInDto.password) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
