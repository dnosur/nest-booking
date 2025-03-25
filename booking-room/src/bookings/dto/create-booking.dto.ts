import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class CreateBookingDto {
    @IsNumber({}, {message: 'Room id must be a number'})
    room_id: number;

    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsDate({ message: 'Start time must be a date' })
    start_time: Date;
  
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsDate({ message: 'End time must be a date' })
    end_time: Date;
}
