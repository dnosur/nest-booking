import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { Request } from 'express';
import { IsAvaliableRoom } from 'utilities/booking';
import { validate } from 'class-validator';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) { }

  async create(@Req() request: Request, createBookingDto: CreateBookingDto) {
    if (!request?.user) {
      throw new HttpException(
        `You must be logged in to book a room`,
        HttpStatus.UNAUTHORIZED
      );
    }

    const current_date = new Date();
    const errors = await validate(createBookingDto);
    if (errors.length > 0 ||
      createBookingDto.start_time > createBookingDto.end_time ||
      createBookingDto.end_time < createBookingDto.start_time ||
      createBookingDto.start_time < current_date ||
      createBookingDto.end_time < current_date
    ) {
      throw new HttpException(
        {
          message: `Validation error`,
          errors: errors
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return IsAvaliableRoom(
      this.prisma,
      createBookingDto.room_id,
      createBookingDto.start_time,
      createBookingDto.end_time
    )
      .then(is_available => {
        if (!is_available) {
          return new HttpException(
            `Room ${+createBookingDto.room_id} is not avaliable`,
            HttpStatus.BAD_REQUEST
          );
        }

        return this.prisma.bookings.create({
          data: {
            user_id: request.user.id,
            room_id: createBookingDto.room_id,
            start_time: createBookingDto.start_time,
            end_time: createBookingDto.end_time
          }
        })
          .then(() => {
            return {
              message: 'Booking has been created!'
            };
          })
          .catch(error => new HttpException({
            message: `Error while booking room ${+createBookingDto.room_id}`,
            error: error
          }, HttpStatus.BAD_REQUEST));
      })
      .catch(error => new HttpException({
        message: `Error while check room ${+createBookingDto.room_id} avaliability`,
        error: error
      }, HttpStatus.BAD_REQUEST));
  }

  remove(@Req() request: Request, id: number) {
    if (!request?.user) {
      throw new HttpException(
        `You must be logged in to book a room`,
        HttpStatus.UNAUTHORIZED
      );
    }

    return this.prisma.bookings.findUnique({
      where: {
        id: id
      }
    })
      .then(booking => {
        if (booking.user_id !== request.user.id) {
          return new HttpException(
            `You are not owner of booking with id ${id}`,
            HttpStatus.UNAUTHORIZED
          );
        }

        const current_date = new Date();
        if (booking.end_time > current_date && 
          booking.start_time < current_date
        ) {
          return new HttpException(
            `You can't remove booking with id ${id} now`,
            HttpStatus.BAD_REQUEST
          );
        }

        return this.prisma.bookings.update({
          where: {
            id: id
          },
          data: {
            is_delete: true
          }
        })
          .then(() => {
            return {
              message: 'Booking has been removed!'
            };
          })
          .catch(error => new HttpException({
            message: `Error while remove booking with id ${id}`,
            error: error
          }, HttpStatus.BAD_REQUEST));  
      })
      .catch(error => new HttpException({
        message: `Error while check room ${id} avaliability`,
        error: error
      }, HttpStatus.BAD_REQUEST));
  }
}
