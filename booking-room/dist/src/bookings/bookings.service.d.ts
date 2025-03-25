import { HttpException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(request: Request, createBookingDto: CreateBookingDto): Promise<HttpException | {
        message: string;
    }>;
    remove(request: Request, id: number): Promise<HttpException | {
        message: string;
    }>;
}
