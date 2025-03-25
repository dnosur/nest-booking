import { Prisma } from "@prisma/client";
export declare function getAllRooms(options?: object): Prisma.Sql;
export declare function getAllRoomsCount(): Prisma.Sql;
export declare function getAllAvailableRooms(search_data: any, options?: object): Prisma.Sql;
export declare function getAvailableRoomById(room_id: any, search_data: any): Prisma.Sql;
export declare function getAllAvaliableRoomsCount(search_data: any): Prisma.Sql;
export declare function getAllUserBookings(user_id: number): Prisma.Sql;
