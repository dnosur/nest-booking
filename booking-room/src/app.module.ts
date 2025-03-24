import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [UsersModule, SignUpModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
