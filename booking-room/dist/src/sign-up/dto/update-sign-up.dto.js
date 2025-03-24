"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSignUpDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_sign_up_dto_1 = require("./create-sign-up.dto");
class UpdateSignUpDto extends (0, mapped_types_1.PartialType)(create_sign_up_dto_1.CreateSignUpDto) {
}
exports.UpdateSignUpDto = UpdateSignUpDto;
//# sourceMappingURL=update-sign-up.dto.js.map