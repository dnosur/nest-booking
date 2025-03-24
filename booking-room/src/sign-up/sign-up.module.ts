import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { SignUpController } from './sign-up.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService, PrismaService],
})
export class SignUpModule {}
