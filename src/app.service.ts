import { Injectable } from '@nestjs/common';

// 服务提供者是NestJs一个非常重要的概念，一般来说，被装饰器@Injectable()修饰的类都可以视为服务提供者。
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
