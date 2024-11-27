import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, GetOneById, UpdateUserDto } from '../dtos/createuser.dto';
import { User, UserRole } from '../entites/user.entity';
import * as bcrypt from 'bcrypt';
import { LineManagerRoles, RegionLocations } from 'src/utils/access-level.util';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // async createUser(createdUser: CreateUserDto): Promise<User> {
  //   return this.userRepository.save(createdUser);
  // }
  // async createUser(createdUser: CreateUserDto): Promise<User> {
  //   // Hash the password
  //   const saltRounds = 10;
  //   const hashedPassword = await bcrypt.hash(createdUser.password, saltRounds);
  
  //   // Replace the plain password with the hashed password
  //   createdUser.password = hashedPassword;
  
  //   // Save the user with the hashed password
  //   return this.userRepository.save(createdUser);
  // }

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
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  
    // Replace the plain password with the hashed password
    userData.password = hashedPassword;
    const existingUserByUsername = await this.userRepository.findOne({ where: { username: userData.username } });
    const existingUserByEmail = await this.userRepository.findOne({ where: { mail: userData.mail } });

    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }
    const newMember = this.userRepository.create(userData);
    
   
    // Ensure all required fields are filled out
    if (!newMember.fullname || !newMember.mail) {
      throw new Error('Missing required fields: fullname or mail');
    }

    await this.userRepository.save(newMember);
    await this.assignLineManagers(newMember);
    return newMember

  }
  async findUsersByLocation(location: string): Promise<User[]> {
    return this.userRepository.find({
      where: { location },
    });
  }
  // async getDelegate(role: UserRole, location: string): Promise<User | null> {
  //   let delegateRole: UserRole;

  //   // Determine delegate role based on current role
  //   switch (role) {
  //     case UserRole.CEO:
  //     case UserRole.COO:
  //     case UserRole.REGIONAL_MANAGER:
  //       delegateRole = UserRole.COMMUNITY_EXECUTIVE;
  //       break;
  //     case UserRole.COMMUNITY_EXECUTIVE:
  //       delegateRole = UserRole.COMMUNITY_ASSOCIATE;
  //       break;
  //     case UserRole.COMMUNITY_ASSOCIATE:
  //     case UserRole.FRONT_DESK_OFFICER:
  //       delegateRole = UserRole.SUPERVISOR;
  //       break;
  //     default:
  //       delegateRole = UserRole.SUPERVISOR;
  //   }

  //   // Find delegate user based on role and location
  //   return this.userRepository.findOne({
  //     where: {
  //       role: delegateRole,
  //       location,
  //     },
  //   });
  // }
  // async getLineManager(role: UserRole, location: string): Promise<User | null> {
  //   let delegateRole: UserRole;

  //   // Determine delegate role based on current role
  //   switch (role) {
  //     case UserRole.CEO:
  //     case UserRole.COO:
  //     case UserRole.REGIONAL_MANAGER:
  //       delegateRole = UserRole.COMMUNITY_EXECUTIVE;
  //       break;
  //     case UserRole.COMMUNITY_EXECUTIVE:
  //       delegateRole = UserRole.COMMUNITY_ASSOCIATE;
  //       break;
  //     case UserRole.COMMUNITY_ASSOCIATE:
  //     case UserRole.FRONT_DESK_OFFICER:
  //       delegateRole = UserRole.SUPERVISOR;
  //       break;
  //     default:
  //       delegateRole = UserRole.SUPERVISOR;
  //   }

  //   // Find delegate user based on role and location
  //   return this.userRepository.findOne({
  //     where: {
  //       role: delegateRole,
  //       location,
  //     },
  //   });
  // }
  // async findOneBy(criteria: { role: UserRole; location: string }): Promise<User | null> {
  //   return this.userRepository.findOne({
  //     where: {
  //       role: criteria.role,
  //       location: criteria.location,
  //     },
  //   });
  // }
  // async assignRelationships(user: User): Promise<void> {
  //   const { role, location } = user;
  
  //   if (!location) {
  //     throw new Error('Location is required to assign relationships.');
  //   }
  
  //   // Fetch all users at the same location
  //   const usersInLocation = await this.userRepository.find({
  //     where: { location },
  //     relations: ['lineManagers', 'delegates'],
  //   });
  
  //   switch (role) {
  //     case UserRole.REGIONAL_MANAGER: {
  //       // Assign all CEs in the region as delegates
  //       const regionalCEs = usersInLocation.filter(
  //         (u) => u.role === UserRole.COMMUNITY_EXECUTIVE
  //       );
  //       user.delegates = regionalCEs;
  
  //       // Assign this Regional Manager as the line manager for all CEs
  //       regionalCEs.forEach((ce) => ce.lineManagers.push(user));
  //       break;
  //     }
  
  //     case UserRole.COMMUNITY_EXECUTIVE: {
  //       // Assign all CAs in the same location as delegates
  //       const locationCAs = usersInLocation.filter(
  //         (u) => u.role === UserRole.COMMUNITY_ASSOCIATE
  //       );
  //       user.delegates = locationCAs;
  
  //       // Assign this CE as the line manager for all CAs
  //       locationCAs.forEach((ca) => ca.lineManagers.push(user));
  //       break;
  //     }
  
  //     case UserRole.COMMUNITY_ASSOCIATE: {
  //       // Assign all FDOs in the same location as line managers
  //       const locationFDOs = usersInLocation.filter(
  //         (u) => u.role === UserRole.FRONT_DESK_OFFICER
  //       );
  //       user.lineManagers = locationFDOs;
  
  //       // Assign this CA as a delegate for all FDOs
  //       locationFDOs.forEach((fdo) => fdo.delegates.push(user));
  //       break;
  //     }
  
  //     case UserRole.FRONT_DESK_OFFICER: {
  //       // Assign all other roles in the same location as delegates
  //       const lowerRoles = usersInLocation.filter(
  //         (u) =>
  //           u.role !== UserRole.REGIONAL_MANAGER &&
  //           u.role !== UserRole.COMMUNITY_EXECUTIVE &&
  //           u.role !== UserRole.COMMUNITY_ASSOCIATE &&
  //           u.role !== UserRole.FRONT_DESK_OFFICER
  //       );
  //       user.delegates = lowerRoles;
  
  //       // Assign this FDO as the line manager for all lower roles
  //       lowerRoles.forEach((roleUser) => roleUser.lineManagers.push(user));
  //       break;
  //     }
  
  //     default:
  //       throw new Error(`Unhandled role: ${role}`);
  //   }
  
  //   // Save updates
  //   await this.userRepository.save(user);
  //   await Promise.all(usersInLocation.map((u) => this.userRepository.save(u)));
  // }

  async assignLineManager(user: User): Promise<User[] | null> {
    // Roles that don't require line managers
    if (
      user.role === UserRole.CEO ||
      user.role === UserRole.COO ||
      user.role === UserRole.REGIONAL_MANAGER
    ) {
      return null; // These roles don't have line managers
    }
  
    let query: any;
  
    // Special case for Community Executive: Find Regional Manager for their region
    if (user.role === UserRole.COMMUNITY_EXECUTIVE) {
      const region = Object.keys(RegionLocations).find((key) =>
        RegionLocations[key].includes(user.location),
      );
  
      if (!region) {
        console.error(`No region found for location: ${user.location}`);
        return null; // No valid region found for the location
      }
  
      query = {
        role: UserRole.REGIONAL_MANAGER,
        region, // Regional Manager must match the determined region
      };
    } else {
      // Default: Find line managers based on role and location
      const lineManagerRole = LineManagerRoles[user.role];
      if (!lineManagerRole) {
        console.error(`No line manager role mapping found for user role: ${user.role}`);
        return null;
      }
  
      query = {
        role: lineManagerRole,
        location: user.location,
      };
    }
  
    // Fetch line managers based on the constructed query
    const lineManagers = await this.userRepository.find({ where: query });
    return lineManagers.length > 0 ? lineManagers : null;
  }
  
  async assignLineManagers(user: User): Promise<void> {
    const lineManagers = await this.assignLineManager(user);
  
    if (lineManagers && lineManagers.length > 0) {
      // Assign the line managers to the user
      user.lineManagers = lineManagers; // For many-to-many relationship
      await this.userRepository.save(user);
    } else {
      console.log(`No line managers found for user: ${user.id} (${user.role})`);
    }
  }
  
  
}
