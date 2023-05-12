import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name?: string;
}
