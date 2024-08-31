import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/controllers/user.controller';
import { AuthService } from './modules/auth/services/auth.service';
import { LocalStrategy } from './modules/auth/local.strategy';
import { configService } from './config/config.service';
import { User } from './modules/user/entites/user.entity';
import { UserService } from './modules/user/services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, AuthService, LocalStrategy],
})
export class AppModule {}
