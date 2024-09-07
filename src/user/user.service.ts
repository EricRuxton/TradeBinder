import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import 'dotenv/config';
import { OnboardingTemplate } from '../../mail_templates/templates';
import { transporter } from '../main';
import { generatePassword } from '../utils/password-hash';

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
      });

      await transporter.sendMail(OnboardingTemplate(createUserDto.email));

      return user;
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
