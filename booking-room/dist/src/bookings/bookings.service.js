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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const prisma_service_1 = require("../prisma/prisma.service");
const booking_1 = require("../../utilities/booking");
const class_validator_1 = require("class-validator");
let BookingsService = class BookingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(request, createBookingDto) {
        if (!request?.user) {
            throw new common_1.HttpException(`You must be logged in to book a room`, common_1.HttpStatus.UNAUTHORIZED);
        }
        const current_date = new Date();
        const errors = await (0, class_validator_1.validate)(createBookingDto);
        if (errors.length > 0 ||
            createBookingDto.start_time > createBookingDto.end_time ||
            createBookingDto.end_time < createBookingDto.start_time ||
            createBookingDto.start_time < current_date ||
            createBookingDto.end_time < current_date) {
            throw new common_1.HttpException({
                message: `Validation error`,
                errors: errors
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return (0, booking_1.IsAvaliableRoom)(this.prisma, createBookingDto.room_id, createBookingDto.start_time, createBookingDto.end_time)
            .then(is_available => {
            if (!is_available) {
                return new common_1.HttpException(`Room ${+createBookingDto.room_id} is not avaliable`, common_1.HttpStatus.BAD_REQUEST);
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
                .catch(error => new common_1.HttpException({
                message: `Error while booking room ${+createBookingDto.room_id}`,
                error: error
            }, common_1.HttpStatus.BAD_REQUEST));
        })
            .catch(error => new common_1.HttpException({
            message: `Error while check room ${+createBookingDto.room_id} avaliability`,
            error: error
        }, common_1.HttpStatus.BAD_REQUEST));
    }
    remove(request, id) {
        if (!request?.user) {
            throw new common_1.HttpException(`You must be logged in to book a room`, common_1.HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.bookings.findUnique({
            where: {
                id: id
            }
        })
            .then(booking => {
            if (booking.user_id !== request.user.id) {
                return new common_1.HttpException(`You are not owner of booking with id ${id}`, common_1.HttpStatus.UNAUTHORIZED);
            }
            const current_date = new Date();
            if (booking.end_time > current_date &&
                booking.start_time < current_date) {
                return new common_1.HttpException(`You can't remove booking with id ${id} now`, common_1.HttpStatus.BAD_REQUEST);
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
                .catch(error => new common_1.HttpException({
                message: `Error while remove booking with id ${id}`,
                error: error
            }, common_1.HttpStatus.BAD_REQUEST));
        })
            .catch(error => new common_1.HttpException({
            message: `Error while check room ${id} avaliability`,
            error: error
        }, common_1.HttpStatus.BAD_REQUEST));
    }
};
exports.BookingsService = BookingsService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], BookingsService.prototype, "create", null);
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], BookingsService.prototype, "remove", null);
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map