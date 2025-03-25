import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request } from 'express';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(request: Request, createBookingDto: CreateBookingDto): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
    remove(request: Request, id: string): Promise<import("@nestjs/common").HttpException | {
        message: string;
    }>;
}
