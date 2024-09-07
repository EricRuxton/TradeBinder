import { PickType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class verifyUserDto extends PickType(User, ['token']) {}
