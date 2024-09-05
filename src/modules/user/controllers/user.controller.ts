import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException,Request, HttpStatus, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, UseGuards } from '@nestjs/common';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';
import { CreateUserDto, GetOneUsernameQuery, UpdatePasswordDto } from '../dtos/createuser.dto';
import { UserService } from '../services/user.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';



export class LoginDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}



@Controller('User')
export class UserController {
  
 

  constructor(private readonly userService: UserService,
    private readonly authService: AuthService,
   
   ) { }
  protected readonly logger = new Logger(this.constructor.name);







@Post('create')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
async create(@Body() createduser: CreateUserDto) {
  try{
 
  
  const user = await this.userService.createUser(createduser);

  return{
    success: true,
    result: user,
   };
}catch (e) {
  this.logger.error(e);
  throw e;
}
}

@Get('/username')
@HttpCode(HttpStatus.OK)
@UsePipes(new InvalidRequestValidator())
async getUserByUsername(@Query() q: GetOneUsernameQuery) {
  try {

    let user = await this.userService.findOneUserByUsername(q?.user_name);
    if (!user) {
      throw new HttpException(`User Not Found`, HttpStatus.NOT_FOUND);
    }
    return {
      success: true,
      result: user,
    };
  } catch (e) {
    this.logger.error(e);
    throw e;
  }
}
@UseGuards(LocalAuthGuard)
@Post('/sign/login')
@HttpCode(HttpStatus.OK)
async login(@Request()req:any){
  return this.authService.login(req.user)
}

@UseGuards(JwtAuthGuard)
@Get('protected')
@HttpCode(HttpStatus.OK)
getjwt(@Request()req):string{
  return req.user
}
@Put('change-password')
@HttpCode(HttpStatus.OK)
async changePassword(
  @Body() updatePasswordDto: UpdatePasswordDto,
) {
  try {
    const { email, newPassword } = updatePasswordDto;

    // Find the user by email
    const user = await this.userService.findOneUserByMail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await this.userService.updateUserPassword(user.id, hashedPassword);

    return {
      success: true,
      message: 'Password changed successfully',
    return:user
    };
  } catch (error) {
    this.logger.error(error);
    throw new HttpException(
      'Failed to change password',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
}


