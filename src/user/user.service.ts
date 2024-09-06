import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
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
      return await this.userRepository.save({
        ...createUserDto,
        salt,
        password: hash,
      });
    } catch (e) {
      throw new ConflictException(e.message);
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
