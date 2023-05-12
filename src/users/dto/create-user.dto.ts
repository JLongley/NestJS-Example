import {
  IsString,
  IsEmail,
  Length,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name?: string;
}
