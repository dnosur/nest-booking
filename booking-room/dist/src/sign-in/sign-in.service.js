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
exports.SignInService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("../../config");
const token_1 = require("../../utilities/token");
const jwtSecret = config_1.default.jwt.JWT_USER_SECRET;
let SignInService = class SignInService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sign_in(createSignInDto) {
        const errors = await (0, class_validator_1.validate)(createSignInDto);
        if (errors.length > 0) {
            throw new common_1.HttpException({
                message: `Validation error`,
                errors: errors
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.users.findUnique({
            where: {
                email: createSignInDto.email,
            },
        })
            .then(founded_user => {
            if (!founded_user) {
                return new common_1.HttpException(`User with email ${createSignInDto.email} is not found!`, common_1.HttpStatus.BAD_REQUEST);
            }
            const isPasswordValid = bcrypt.compareSync(createSignInDto.password, founded_user.password);
            if (!isPasswordValid) {
                return new common_1.HttpException(`Email or password is incorrect!`, common_1.HttpStatus.BAD_REQUEST);
            }
            const access_token = jwt.sign({ ...founded_user }, jwtSecret, { expiresIn: '2d' });
            return {
                access_token: access_token,
                expire: (0, token_1.getEndTime)()
            };
        })
            .catch(error => {
            throw new common_1.HttpException({
                message: `Error while getting user with email '${createSignInDto.email}'`,
                error: error
            }, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
exports.SignInService = SignInService;
exports.SignInService = SignInService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SignInService);
//# sourceMappingURL=sign-in.service.js.map