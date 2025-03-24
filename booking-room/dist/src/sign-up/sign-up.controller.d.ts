import { SignUpService } from './sign-up.service';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
export declare class SignUpController {
    private readonly signUpService;
    constructor(signUpService: SignUpService);
    create(createSignUpDto: CreateSignUpDto): void;
}
