import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional, IsEmail, IsInt, IsDate, IsNotEmpty } from 'class-validator';
@Exclude()
export class CreateMemberDto {
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

@Exclude()
export class GetOneById {
  @Expose()
  @IsString()
 
  public readonly id: string;
}
