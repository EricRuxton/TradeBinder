import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { OnboardingOptions } from '../../mail_templates/mail_options';
import { transporter } from '../main';
import { generatePassword } from '../utils/password-hash';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const token = uuidv4();
    try {
      const { hash, salt } = await generatePassword(createUserDto.password);

      await this.userRepository.save({
        ...createUserDto,
        salt,
        password: hash,
        token: token,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
    const user = await this.findOne(createUserDto.username);
    await transporter.sendMail(OnboardingOptions(user.email, user.id, token));

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    return await this.userRepository.findOneByOrFail({
      username,
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: {
        collection: true,
      },
    });
  }

  async findSensitiveUser(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
      select: ['username', 'salt', 'password', 'verified', 'locked'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ ...updateUserDto, id });
  }
}
