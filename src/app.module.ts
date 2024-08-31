import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import {ConfigModule} from '@nestjs/config'
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './modules/auth/services/auth.service';


@Module({
  imports: [
    ConfigModule.forRoot(),TypeOrmModule.forRoot(configService.getTypeOrmConfig()),TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),TypeOrmModule.forFeature([User]),
  PassportModule],
  controllers: [AppController,UserController],
  providers: [AppService,UserService,AuthService],
})
export class AppModule {}
