"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSignInDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sign_in_dto_1 = require("./create-sign-in.dto");
class UpdateSignInDto extends (0, mapped_types_1.PartialType)(create_sign_in_dto_1.CreateSignInDto) {
}
exports.UpdateSignInDto = UpdateSignInDto;
//# sourceMappingURL=update-sign-in.dto.js.map