import { Post as PostSchema } from './post.model';
import { Controller, Get, Post, Param, Body, Query, Put, Delete } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

class CreatePostsDto {
  @ApiModelProperty({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({ message: '请填写标题' })
  title: string;
  @ApiModelProperty({ description: '帖子内容', example: '帖子内容' })
  content: string;
}

// tslint:disable-next-line: max-classes-per-file
@Controller('posts')
@ApiUseTags('posts')
export class PostsController {

  constructor(@InjectModel(PostSchema) private readonly postModel: ReturnModelType<typeof PostSchema>) { }

  @Get()
  @ApiOperation({ title: '获取帖子列表' })
  async index() {
    return await this.postModel.find();
  }

  @Get(':id')
  @ApiOperation({ title: '获取帖子详情' })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id);
  }

  @Post()
  @ApiOperation({ title: '创建帖子' })
  async create(@Body() postsDto: CreatePostsDto, @Query() query, @Param() params) {
    await this.postModel.create(postsDto);
    return {
      success: true,
      data: postsDto,
    };
  }

  @Put(':id')
  @ApiOperation({ title: '编辑帖子' })
  async update(@Body() postsDto: CreatePostsDto, @Param('id') id: string) {
    await this.postModel.findByIdAndUpdate(id, postsDto);
    return {
      success: true,
      postsDto,
      id,
    };
  }

  @Delete(':id')
  @ApiOperation({ title: '删除帖子' })
  async remove(@Param('id') id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
