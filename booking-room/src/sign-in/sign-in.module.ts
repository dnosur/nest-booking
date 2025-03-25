import { Module } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInController } from './sign-in.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SignInController],
  providers: [SignInService, PrismaService],
})
export class SignInModule {}
