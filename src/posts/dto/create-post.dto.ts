import { IsEmail, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 50)
  title: string;

  @IsString()
  @Length(1, 500)
  content: string;

  @IsEmail()
  authorEmail: string;
}
