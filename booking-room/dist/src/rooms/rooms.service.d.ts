import { HttpException } from '@nestjs/common';
import { Request } from 'express';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RoomsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoomDto: CreateRoomDto): Promise<HttpException | {
        message: string;
    }>;
    findAll(request: Request): Promise<HttpException | {
        rooms: any[];
        total_pages: number;
        current_page: number;
    }>;
    avaliable(request: Request): Promise<HttpException | {
        rooms: any[];
        total_pages: number;
        current_page: number;
    }>;
}
