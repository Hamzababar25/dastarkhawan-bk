import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException,Request, HttpStatus, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, UseGuards } from '@nestjs/common';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';
import { CreateUserDto, GetOneUsernameQuery } from '../dtos/createuser.dto';
import { UserService } from '../services/user.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthService } from 'src/modules/auth/services/auth.service';



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
    console.log("show1,",user)
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
  console.log("random bullshit go")
  return req.user
}
}
