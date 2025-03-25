import { Request } from 'express';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
    findAll(request: Request): Promise<import("@nestjs/common").HttpException | {
        rooms: any[];
        total_pages: number;
        current_page: number;
    }>;
    findAllAvaliable(request: Request): Promise<import("@nestjs/common").HttpException | {
        rooms: any[];
        total_pages: number;
        current_page: number;
    }>;
}
