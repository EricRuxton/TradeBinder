import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserModule } from '../user/user.module';
import { CollectionModule } from '../collection/collection.module';
import { TradebinderModule } from '../tradebinder/tradebinder.module';

@Module({
  imports: [
    UserModule,
    CollectionModule,
    TradebinderModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
