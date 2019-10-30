import { Post } from './post.model'
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  controllers: [PostsController],
  imports: [
    TypegooseModule.forFeature([Post])
  ],
})
export class PostsModule { }
