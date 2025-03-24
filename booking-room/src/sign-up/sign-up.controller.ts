import { Controller, Post, Body } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { CreateSignUpDto } from './dto/create-sign-up.dto';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  create(@Body() createSignUpDto: CreateSignUpDto) {
    return this.signUpService.signUp(createSignUpDto);
  }
}
