"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
const bcrypt = require("bcrypt");
const config = require("../config");
function hash(str, _salt_rounds = config.default.bcrypt.saltRounds) {
    const salt = bcrypt.genSaltSync(_salt_rounds);
    const hash = bcrypt.hashSync(str, salt);
    return hash;
}
//# sourceMappingURL=bcrypt.js.map