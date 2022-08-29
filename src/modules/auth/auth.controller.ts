import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuthController, IAuthService, LoginResponse } from './auth.structure';
import { LoginDto } from './dto/profile-register.dto';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(@Inject(AuthService) private readonly service: IAuthService) {}

  @Post()
  login(@Body() params: LoginDto): Promise<LoginResponse> {
    return this.service.login(params);
  }
}
