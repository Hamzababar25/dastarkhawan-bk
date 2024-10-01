import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsUUID, IsOptional, Matches, IsInt, IsEnum } from 'class-validator';
import { DeptRole, UserRole } from '../entites/user.entity';


@Exclude()
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsOptional()
  @IsEmail()
  mail?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsInt()
  cnic?: number;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  location?: string;

  

  

  @IsOptional()
  @IsString()
  salarySlip?: string;

  @IsOptional()
  @IsInt()
  salary?: number;

  @IsOptional()
  @IsString()
  recentExpenseClaim?: string;

  @IsOptional()
  @IsString()
  contract?: string;

  @IsOptional()
  @IsString()
  bankLetter?: string;

  @IsOptional()
  @IsString()
  letterhead?: string;
}




@Exclude()
export class GetOneUsernameQuery {
  @Expose()
  @IsString()
  @IsOptional()
  @Matches(/^[^#]*$/, {
    message: 'User name should not contain the "#" character.',
  })
  public readonly user_name: string;
}
@Exclude()
export class UpdatePasswordDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}

@Exclude()
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  cnic?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsOptional()
  @IsString()
  dob?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  deptRole?: string;

  @IsOptional()
  @IsInt()
  salary?: number;

  @IsOptional()
  @IsString()
  Delegate?: string;



  @IsOptional()
  @IsString()
  contract?: string;

  @IsOptional()
  @IsString()
  bankLetter?: string;

  @IsOptional()
  @IsString()
  letterhead?: string;
  
}