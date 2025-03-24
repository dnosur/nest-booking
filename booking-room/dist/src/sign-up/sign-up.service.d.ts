import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SignUpService {
    private prisma;
    constructor(prisma: PrismaService);
    signUp(createSignUpDto: CreateSignUpDto): void;
}
