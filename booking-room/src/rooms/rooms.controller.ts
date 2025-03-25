import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { request, Request } from 'express';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.roomsService.findAll(request);
  }

  @Get('/available')
  findAllAvaliable(@Req() request: Request) {
    return this.roomsService.avaliable(request);
  }
}
