import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  name?: string;
}
