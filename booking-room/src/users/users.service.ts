/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getAllUserBookings } from 'prisma/queries/rooms';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  userBookings(id: number) {
    console.log(`User id: ${id}`);
    return this.prisma.$queryRaw(getAllUserBookings(id))
      .then(result => result)
      .catch(error => new HttpException({
        message: `Error while getting user bookings with id ${id}`,
        error: error
      }, HttpStatus.BAD_REQUEST));
  }
}
