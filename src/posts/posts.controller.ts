import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostModel } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createDraft(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    const { title, content, authorEmail } = createPostDto;
    return this.postsService.create({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPublishedPosts(@Query('search') searchString): Promise<PostModel[]> {
    if (searchString !== null) {
      return this.postsService.posts({
        where: {
          published: true,
          OR: [
            {
              title: { contains: searchString },
            },
            {
              content: { contains: searchString },
            },
          ],
        },
      });
    } else {
      return this.postsService.posts({
        where: { published: true },
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.post({ id: Number(id) });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update({
      where: { id: Number(id) },
      data: updatePostDto,
    });
  }

  @Put(':id/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.update({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.delete({ id: Number(id) });
  }
}
