import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entites/user.entity';




import { In, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/createuser.dto';






@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
   
   ) { }



  

    async createUser(createduser: CreateUserDto,): Promise<User> {
      const { mail, fullname,username,password,...rest } = createduser;
    
      // const user = new User();
      // user.id = userId;
      // user.mail = mail;
      // user.phoneNumber = phoneNumber;
      // user.fullname = fullname;
     // user.role = RoleName.Customer;
    
      const user=await this.userRepository.save(createduser);
    
      return user;
    }
    async findOneUserByUsername(user_name: string) {
        return await this.userRepository.findOne({ where: { username: user_name, } });
      }
}