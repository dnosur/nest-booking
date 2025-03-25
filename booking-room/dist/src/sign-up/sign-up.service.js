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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const bcrypt_1 = require("../../utilities/bcrypt");
const class_validator_1 = require("class-validator");
let SignUpService = class SignUpService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signUp(createSignUpDto) {
        const errors = await (0, class_validator_1.validate)(createSignUpDto);
        if (errors.length > 0) {
            throw new common_2.HttpException({
                message: `Validation error`,
                errors: errors
            }, common_2.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.users.findUnique({
            where: {
                email: createSignUpDto.email,
            },
        })
            .then(founded_user => {
            if (founded_user) {
                throw new common_2.HttpException(`User with email ${createSignUpDto.email} is already exist!`, common_2.HttpStatus.BAD_REQUEST);
            }
            createSignUpDto.password = (0, bcrypt_1.hash)(createSignUpDto.password);
            return this.prisma.users.create({
                data: createSignUpDto
            })
                .then(() => {
                return {
                    message: `SingUp complated successfull!`
                };
            })
                .catch(error => {
                throw new common_2.HttpException({
                    message: `Error while created user!`,
                    error: error
                }, common_2.HttpStatus.BAD_REQUEST);
            });
        })
            .catch(error => {
            throw new common_2.HttpException({
                message: `Error while getting user with email ${createSignUpDto.email}`,
                error: error
            }, common_2.HttpStatus.BAD_REQUEST);
        });
    }
};
exports.SignUpService = SignUpService;
exports.SignUpService = SignUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SignUpService);
//# sourceMappingURL=sign-up.service.js.map