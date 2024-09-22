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
export class CreateUserDto extends UpdateUserDto {
   @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsOptional()
  @IsEnum(DeptRole)
  deptRole?: DeptRole;

  @IsOptional()
  @IsInt()
  salary?: number;
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

