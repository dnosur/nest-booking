"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndTime = getEndTime;
function getEndTime() {
    const date = new Date().getTime() + 7200000;
    return new Intl.DateTimeFormat('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Kyiv',
    }).format(date);
}
//# sourceMappingURL=token.js.map