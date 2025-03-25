import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { validate } from 'class-validator';
import { getAllAvailableRooms, getAllAvaliableRoomsCount, getAllRooms, getAllRoomsCount } from 'prisma/queries/rooms';
import { sample } from 'rxjs';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) { }

  async create(createRoomDto: CreateRoomDto) {
    const errors = await validate(CreateRoomDto);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: `Validation error`,
          errors: errors
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.prisma.rooms.findUnique({
      where: {
        name: createRoomDto.name,
      }
    })
      .then(founded_room => {
        if (founded_room) {
          return new HttpException(
            `Room with name ${createRoomDto.name} is already exist!`,
            HttpStatus.BAD_REQUEST
          );
        }

        return this.prisma.rooms.create({
          data: createRoomDto
        })
          .then(() => {
            return {
              message: 'Room has been created!'
            }
          })
          .catch(error => new HttpException(
            {
              message: `Error while creating room!`,
              error: error
            },
            HttpStatus.BAD_REQUEST
          ));
      })
      .catch(error => new HttpException(
        {
          message: `Error while creating room!`,
          error: error
        },
        HttpStatus.BAD_REQUEST
      ));
  }

  async findAll(@Req() request: Request) {
    const query_page = +request.query?.page || 1;
    const per_page = +request.query?.per_page || 25;

    const page = isNaN(query_page) || query_page < 1
      ? 0
      : query_page - 1;
    const start_index = per_page * page;

    const options = {
      offset: start_index,
      limit: per_page,
      desc: request?.query.sort_type === 'desc'
    };

    return Promise.all([
      this.prisma.$queryRaw(getAllRooms(options)),
      this.prisma.$queryRaw(getAllRoomsCount())
    ])
      .then(([rooms, count] : [Array<any>, Array<any>]) => {
        return {
          rooms: rooms.map(room => {
            if (!Object.keys(room.user).length) {
              room.user = null;
            }
            return room
          }),
          total_pages: Math.ceil(Number(count[0].total_count) / Number(per_page)),
          current_page: query_page
        }
      })
      .catch(error => new HttpException(
        {
          message: `Error while getting all rooms!`,
          error: error
        },
        HttpStatus.BAD_REQUEST
      ));
  }

  async avaliable(@Req() request: Request) {
    const query_page = +request.query?.page || 1;
    const per_page = +request.query?.per_page || 25;

    const page = isNaN(query_page) || query_page < 1
      ? 0
      : query_page - 1;
    const start_index = per_page * page;

    const options = {
      offset: start_index,
      limit: per_page,
      desc: request?.query.sort_type === 'desc'
    };

    const search_data = {
      start_time: request.query?.start_time as string,
      end_time: request.query?.end_time as string
    };

    if (!search_data?.start_time || !search_data?.end_time) {
      return new HttpException(
        `You must provide start_time and end_time`,
        HttpStatus.BAD_REQUEST
      );
    }

    return Promise.all([
      this.prisma.$queryRaw(getAllAvailableRooms(search_data, options)),
      this.prisma.$queryRaw(getAllAvaliableRoomsCount(search_data))
    ])
      .then(([rooms, count] : [Array<any>, Array<any>]) => {
        return {
          rooms: rooms,
          total_pages: Math.ceil(Number(count[0].total_count) / Number(per_page)),
          current_page: query_page
        }
      })
      .catch(error => new HttpException(
        {
          message: `Error while getting all avaliable rooms!`,
          error: error
        },
        HttpStatus.BAD_REQUEST
      ));
  }
}
