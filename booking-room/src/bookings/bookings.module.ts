import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthMiddleware } from 'middlewares/authenticationTokens';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService],
})
export class BookingsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'bookings',
      method: RequestMethod.POST,
    }, {
      path: 'bookings/:id',
      method: RequestMethod.DELETE,
    });
  }
}
