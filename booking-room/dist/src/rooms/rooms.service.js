"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room.dto");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
const rooms_1 = require("../../prisma/queries/rooms");
let RoomsService = class RoomsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoomDto) {
        const errors = await (0, class_validator_1.validate)(create_room_dto_1.CreateRoomDto);
        if (errors.length > 0) {
            throw new common_1.HttpException({
                message: `Validation error`,
                errors: errors
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.rooms.findUnique({
            where: {
                name: createRoomDto.name,
            }
        })
            .then(founded_room => {
            if (founded_room) {
                return new common_1.HttpException(`Room with name ${createRoomDto.name} is already exist!`, common_1.HttpStatus.BAD_REQUEST);
            }
            return this.prisma.rooms.create({
                data: createRoomDto
            })
                .then(() => {
                return {
                    message: 'Room has been created!'
                };
            })
                .catch(error => new common_1.HttpException({
                message: `Error while creating room!`,
                error: error
            }, common_1.HttpStatus.BAD_REQUEST));
        })
            .catch(error => new common_1.HttpException({
            message: `Error while creating room!`,
            error: error
        }, common_1.HttpStatus.BAD_REQUEST));
    }
    async findAll(request) {
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
            this.prisma.$queryRaw((0, rooms_1.getAllRooms)(options)),
            this.prisma.$queryRaw((0, rooms_1.getAllRoomsCount)())
        ])
            .then(([rooms, count]) => {
            return {
                rooms: rooms.map(room => {
                    if (!Object.keys(room.user).length) {
                        room.user = null;
                    }
                    return room;
                }),
                total_pages: Math.ceil(Number(count[0].total_count) / Number(per_page)),
                current_page: query_page
            };
        })
            .catch(error => new common_1.HttpException({
            message: `Error while getting all rooms!`,
            error: error
        }, common_1.HttpStatus.BAD_REQUEST));
    }
    async avaliable(request) {
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
            start_time: request.query?.start_time,
            end_time: request.query?.end_time
        };
        if (!search_data?.start_time || !search_data?.end_time) {
            return new common_1.HttpException(`You must provide start_time and end_time`, common_1.HttpStatus.BAD_REQUEST);
        }
        return Promise.all([
            this.prisma.$queryRaw((0, rooms_1.getAllAvailableRooms)(search_data, options)),
            this.prisma.$queryRaw((0, rooms_1.getAllAvaliableRoomsCount)(search_data))
        ])
            .then(([rooms, count]) => {
            return {
                rooms: rooms,
                total_pages: Math.ceil(Number(count[0].total_count) / Number(per_page)),
                current_page: query_page
            };
        })
            .catch(error => new common_1.HttpException({
            message: `Error while getting all avaliable rooms!`,
            error: error
        }, common_1.HttpStatus.BAD_REQUEST));
    }
};
exports.RoomsService = RoomsService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsService.prototype, "findAll", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomsService.prototype, "avaliable", null);
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map