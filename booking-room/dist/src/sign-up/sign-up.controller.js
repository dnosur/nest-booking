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
exports.SignUpController = void 0;
const common_1 = require("@nestjs/common");
const sign_up_service_1 = require("./sign-up.service");
const create_sign_up_dto_1 = require("./dto/create-sign-up.dto");
let SignUpController = class SignUpController {
    constructor(signUpService) {
        this.signUpService = signUpService;
    }
    create(createSignUpDto) {
        return this.signUpService.signUp(createSignUpDto);
    }
};
exports.SignUpController = SignUpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sign_up_dto_1.CreateSignUpDto]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "create", null);
exports.SignUpController = SignUpController = __decorate([
    (0, common_1.Controller)('sign-up'),
    __metadata("design:paramtypes", [sign_up_service_1.SignUpService])
], SignUpController);
//# sourceMappingURL=sign-up.controller.js.map