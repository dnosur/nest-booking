"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitOffset = limitOffset;
const lodash_1 = require("lodash");
function limitOffset(options) {
    return (!(0, lodash_1.isNull)(options.limit) && !(0, lodash_1.isNull)(options.offset)) &&
        !isNaN(options.limit) && !isNaN(options.offset)
        ? `LIMIT ${options.limit} OFFSET ${options.offset};`
        : '';
}
;
//# sourceMappingURL=queries.js.map