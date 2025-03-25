import { getAvailableRoomById } from "prisma/queries/rooms";
import { PrismaService } from "src/prisma/prisma.service";

export function IsAvaliableRoom(
    prisma: PrismaService, 
    room_id : number, 
    start_time: Date, 
    end_time: Date
) : Promise<boolean> {
    return new Promise((resolve, reject) => {
        prisma.$queryRaw(getAvailableRoomById(room_id, { start_time, end_time }))
            .then((result: Array<{available: boolean}>) => {
                if (result.length && result[0].available) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            }); 
    });
}