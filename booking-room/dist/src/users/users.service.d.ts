import { PrismaService } from 'src/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    userBookings(id: number): Promise<unknown>;
}
