import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateSignUpDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;
}
