import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpException,Request, HttpStatus, Logger, NotFoundException, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, UseGuards, Patch } from '@nestjs/common';
import { InvalidRequestValidator } from 'src/common/pipes/invalid-request-validator';
import { MemberService } from '../services/members.service';
import { CreateMemberDto } from '../dtos/createmember.dto';
import { UploadFile, UploadPDF } from 'src/utils/file-uploading.utils';





@Controller('Member')
export class MemberController {
  
 

  constructor(private readonly memberService: MemberService,
    
   
   ) { }
  protected readonly logger = new Logger(this.constructor.name);







  @Post('create')
//   @UsePipes(new InvalidRequestValidator())
  @HttpCode(HttpStatus.CREATED)
  async createMember(@Body() createMemberDto: CreateMemberDto) {
    console.log('Incoming Data:', createMemberDto);  // Debugging: log the request data
  
    try {
      const { contract, letterhead, bankLetter, image, ...memberData } = createMemberDto;
      
      console.log('Member Data without files:', memberData);  // Log member data without files
      
    
      let imageUrl: string = null;


      if (image) {
        console.log('Image found, uploading...');  // Check if the image exists
        imageUrl = await UploadFile(image);
      }
  
      
     
  
      console.log('Saving member data with uploaded files...');
  
      const newMember = await this.memberService.create({
        ...memberData,
    
        image: imageUrl,
      });
  
      console.log('Member created successfully:', newMember);  // Log the created member
  
      return {
        success: true,
        message: 'Member created successfully!',
        data: newMember,
      };
    } catch (e) {
      console.error('Error creating member:', e.message);  // Log any errors
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('search')
  async searchMemberByFullname(@Query('fullname') fullname: string) {
    return this.memberService.findByFullname(fullname);
  }
  @Get()
  async searchAllMembers() {
    return this.memberService.getAll();
  }

}


