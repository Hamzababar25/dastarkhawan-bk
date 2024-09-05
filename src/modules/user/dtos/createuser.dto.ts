import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsUUID, IsOptional, Matches } from 'class-validator';

export class CreateUserDto {
// @Expose()
//   @IsString()
//   @IsNotEmpty()
//       id: string;
  
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
  
    @IsString()
    @IsNotEmpty()
    fullname: string;
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