import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { SignInModule } from './sign-in/sign-in.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [UsersModule, SignUpModule, SignInModule, RoomsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
