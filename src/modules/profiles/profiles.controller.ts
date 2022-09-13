import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Roles } from 'src/middlewares/auth.guard';
import { ProfileRegisterDTO } from './dto/profile-register.dto';
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

  @Post('admin')
  @Roles('Admin')
  registerAdmin(@Body() params: ProfileRegisterDTO): Promise<IProfile> {
    return this.profileService.registerAdmin(params);
  }

  @Post('candidates')
  registerCandidates(@Body() params: ProfileRegisterDTO): Promise<IProfile> {
    return this.profileService.registerCandidates(params);
  }
}
