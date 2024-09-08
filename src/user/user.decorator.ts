import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

export const UserDecorator = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException();
    if (authHeader.split(' ').length !== 2)
      throw new BadRequestException(
        'Bearer token should be format "Bearer <token>"',
      );
    const bearerToken = authHeader.split(' ')[1];
    const authService = AuthService.singleton;
    const user = await authService.getUserFromToken(bearerToken);
    if (!user) throw new UnauthorizedException();
    return user;
  },
);
