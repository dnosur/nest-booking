import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      messgae: 'Index booking page',
    };
  }
}
