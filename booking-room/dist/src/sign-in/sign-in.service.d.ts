import { HttpException } from '@nestjs/common';
import { CreateSignInDto } from './dto/create-sign-in.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SignInService {
    private prisma;
    constructor(prisma: PrismaService);
    sign_in(createSignInDto: CreateSignInDto): Promise<HttpException | {
        access_token: any;
        expire: string;
    }>;
}
