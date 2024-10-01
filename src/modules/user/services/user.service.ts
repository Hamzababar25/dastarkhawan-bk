import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, GetOneById, UpdateUserDto } from '../dtos/createuser.dto';
import { User } from '../entites/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createdUser: CreateUserDto): Promise<User> {
    return this.userRepository.save(createdUser);
  }

  async findOneUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
  async findOneById(id: string): Promise<User> {
  
  // Use findOne method and pass the correct options
  return this.userRepository.findOne({
    where: { id }, // id is of type number
  });
  }
  async findOneUserByMail(mail: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { mail } });
  }
  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { password: hashedPassword });
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateUserDto); // Update user fields

    return this.userRepository.save(user); // Save updated user
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newMember = this.userRepository.create(userData);

    // Ensure all required fields are filled out
    if (!newMember.fullname || !newMember.mail) {
      throw new Error('Missing required fields: fullname or mail');
    }

    return this.userRepository.save(newMember);
  }


}
