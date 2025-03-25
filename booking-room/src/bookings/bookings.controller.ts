import { Controller, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

import { Request } from 'express';


@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Req() request: Request, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(request, createBookingDto);
  }

  @Delete(':id')
  remove(@Req() request: Request, @Param('id') id: string) {
    return this.bookingsService.remove(request, +id);
  }
}
