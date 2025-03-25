import { PrismaService } from "src/prisma/prisma.service";
export declare function IsAvaliableRoom(prisma: PrismaService, room_id: number, start_time: Date, end_time: Date): Promise<boolean>;
