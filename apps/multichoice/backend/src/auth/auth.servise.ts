import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '@monorepo/multichoice/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';

@Injectable()
export class authService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) {

    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: createUserDto.email });
        if (user) {
            throw new HttpException(
                { message: 'email already exists' },
                HttpStatus.BAD_REQUEST,
            );
        }

        createUserDto.password = await bcrypt.hash(createUserDto.password, 12)

        return this.userRepository.save(createUserDto)
    }

    async findOne(login: LoginUserDto) {

        const user = await this.userRepository.findOneBy({ email: login.email });
        if (!user) {
            throw new BadRequestException('Email is not found');
        }

        if (!await bcrypt.compare(login.password, user.password)) {
            throw new BadRequestException('password is incore');
        }

        const payload: AuthPayload = {
            name: user.username,
            email: user.email,
            id: user.id,
        };


        return {
            token: await this.jwtService.signAsync({ id: payload.id }),
            payload,
        };
    }

}
