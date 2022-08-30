import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Roles } from 'src/middlewares/auth.guard';
import { ProfileRegisterAdminDTO } from './dto/profile-register.dto';
import { ProfileService } from './profiles.service';
import {
  IProfile,
  IProfileController,
  IProfileService,
} from './profiles.structure';

@Controller('profile')
export class ProfileController implements IProfileController {
  constructor(
    @Inject(ProfileService) private readonly profileService: IProfileService,
  ) {}

  @Post()
  @Roles('Admin')
  registerAdmin(@Body() params: ProfileRegisterAdminDTO): Promise<IProfile> {
    return this.profileService.registerAdmin(params);
  }
}
