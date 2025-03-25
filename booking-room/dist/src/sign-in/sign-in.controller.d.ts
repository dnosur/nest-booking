import { SignInService } from './sign-in.service';
import { CreateSignInDto } from './dto/create-sign-in.dto';
export declare class SignInController {
    private readonly signInService;
    constructor(signInService: SignInService);
    create(createSignInDto: CreateSignInDto): Promise<import("@nestjs/common").HttpException | {
        access_token: any;
        expire: string;
    }>;
}
