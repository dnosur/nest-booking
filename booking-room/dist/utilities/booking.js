"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAvaliableRoom = IsAvaliableRoom;
const rooms_1 = require("../prisma/queries/rooms");
function IsAvaliableRoom(prisma, room_id, start_time, end_time) {
    return new Promise((resolve, reject) => {
        prisma.$queryRaw((0, rooms_1.getAvailableRoomById)(room_id, { start_time, end_time }))
            .then((result) => {
            if (result.length && result[0].available) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        })
            .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}
//# sourceMappingURL=booking.js.map