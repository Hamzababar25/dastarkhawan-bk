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
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './modules/auth/jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { MemberController } from './modules/members/controllers/members.controllers';
import { MemberService } from './modules/members/services/members.service';
import { Member } from './modules/members/entites/members.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User,Member]),
    PassportModule,JwtModule.register({
      secret:"SECRET",signOptions:{expiresIn:'60s'},
    }),
    MailerModule.forRoot({
      transport: {
        service:"gmail",
        host: process.env.EMAIL_HOST,
        auth: {
          user: 'cb650ee9b7d90b',
          pass: 'e41b1479a829a5',
        },
      },
    }),
  ],
  controllers: [AppController, UserController,AuthController,MemberController],
  providers: [AppService, UserService, AuthService, LocalStrategy,JwtStrategy,MemberService],
})
export class AppModule {}
