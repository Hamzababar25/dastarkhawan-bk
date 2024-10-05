import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException,Request, HttpStatus, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, UseGuards, Patch, UnauthorizedException } from '@nestjs/common';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';
import { CreateUserDto, GetOneById, GetOneUsernameQuery, UpdatePasswordDto, UpdateUserDto } from '../dtos/createuser.dto';
import { UserService } from '../services/user.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { IsNotEmpty, IsString } from 'class-validator';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';
import { UploadFile, UploadPDF } from 'src/utils/file-uploading.utils';



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
// @UseGuards(LocalAuthGuard)
// @Post('/sign/login')
// @HttpCode(HttpStatus.OK)
// async login(@Request()req:any){
//   return this.authService.login(req.user)
// }
@UseGuards(LocalAuthGuard)
@Post('/sign/login')
@HttpCode(HttpStatus.OK)
async login(@Request() req: any) {
  Logger.log('Login request received', 'AuthController');
  Logger.log(`Received user: ${JSON.stringify(req.user)}`, 'AuthController');
  
  if (!req.user) {
    Logger.error('User not found', 'AuthController');
    throw new UnauthorizedException('Invalid credentials');
  }

  try {
    const result = await this.authService.login(req.user);
    Logger.log('Login successful', 'AuthController');
    return result;
  } catch (error) {
    Logger.error(`Login error: ${error.message}`, 'AuthController');
    throw error;
  }
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


@HttpCode(HttpStatus.OK)
@UsePipes(new InvalidRequestValidator())
@Patch(':id')
async updateUser(
  @Query('id') id: string,
  @Body() updateUserDto: UpdateUserDto
) {
  try{
  return await this.userService.updateUser(id, updateUserDto);
  }
  catch (e) {
    this.logger.error(e);
    throw e;
  }
}



@Post('create')
//   @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.CREATED)
  async createMember(@Body() createuserDto: CreateUserDto) {
    console.log('Incoming Data:', createuserDto);  // Debugging: log the request data
  
    try {
      const { contract, letterhead, bankLetter, image, ...memberData } = createuserDto;
      
      console.log('Member Data without files:', memberData);  // Log member data without files
      
      let contractUrl: string = null;
      let letterheadUrl: string = null;
      let bankstatementUrl: string = null;
      let imageUrl: string = null;


      if (image) {
        console.log('Image found, uploading...');  // Check if the image exists
        imageUrl = await UploadFile(image);
      }
  
      if (contract) {
        console.log('Contract found, uploading...');  // Check if the contract exists
        contractUrl = await UploadPDF(contract);
        console.log("done")
      }
  
      if (letterhead) {
        console.log('Letterhead found, uploading...');  // Check if the letterhead exists
        letterheadUrl = await UploadPDF(letterhead);
      }
  
      if (bankLetter) {
        console.log('Bank letter found, uploading...');  // Check if the bank letter exists
        bankstatementUrl = await UploadPDF(bankLetter);
      }
  
     
  
      console.log('Saving member data with uploaded files...');
  
      const newMember = await this.userService.create({
        ...memberData,
        contract: contractUrl,
        letterhead: letterheadUrl,
        bankLetter: bankstatementUrl,
        image: imageUrl,
      });
  
      console.log('User created successfully:', newMember);  // Log the created member
  
      return {
        success: true,
        message: 'User created successfully!',
        data: newMember,
      };
    } catch (e) {
      console.error('Error creating member:', e.message);  // Log any errors
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }





  @Get('get/user')
  @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.OK)
  async findOneBy( @Query() q: GetOneById){
    try{
    let user= await this.userService.findOneById(q?.id);
    if(!user){
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
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


