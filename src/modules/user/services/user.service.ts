import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/createuser.dto';
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
  async findOneById(id: any): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
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
}
