import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';

@Controller()
@ApiUseTags('/')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  index(): string {
    return '这是首页';
  }
}
