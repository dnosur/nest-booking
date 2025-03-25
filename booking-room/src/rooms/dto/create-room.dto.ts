import { IsNumber, IsString, MaxLength, MinLength, Min } from "class-validator";

export class CreateRoomDto {
    @IsString({ message: 'Name must be a string' })
    @MaxLength(64, { message: 'Name must not exceed 64 characters' })
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    name: string;

    @IsNumber({
        allowNaN: false,
        allowInfinity: false
    }, { message: 'Capacity must be a number' })
    @Min(1, { message: 'Capacity must be at least 1' })
    capacity: number
}
