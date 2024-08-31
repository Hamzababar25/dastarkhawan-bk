import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException, HttpStatus, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes } from '@nestjs/common';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';
import { CreateUserDto, GetOneUsernameQuery } from '../dtos/createuser.dto';
import { UserService } from '../services/user.service';







@Controller('User')
export class UserController {
  
 

  constructor(private readonly userService: UserService,
   
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
}