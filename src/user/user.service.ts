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
    try {
      const { hash, salt } = await generatePassword(createUserDto.password);

      const user = await this.userRepository.save({
        ...createUserDto,
        salt,
        password: hash,
        verificationCode: uuidv4,
      });

      await transporter.sendMail(OnboardingOptions(createUserDto.email));

      return this.findOne(user.username);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async findProfile(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
      select: ['username', 'salt', 'password'],
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verify(id: number, token: string) {
    const user = await this.findOneById(id);
    if (!user || user.token !== token) {
      throw new BadRequestException('Bad Token');
    }
    return await this.userRepository.save({ ...user, verified: true });
  }
}
