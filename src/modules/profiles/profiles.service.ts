import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { RegisterAdminServiceParams } from './models/profile-params';
import { ProfileRepository } from './profile.repository';
import {
  IProfile,
  IProfileRepository,
  IProfileService,
} from './profiles.structure';
import generateCodeRandom from 'src/helpers/generateCodeRandom';
import exclude from 'src/validations/excludeProperties';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject(ProfileRepository) private readonly repository: IProfileRepository,
  ) {}

  async registerAdmin(params: RegisterAdminServiceParams): Promise<IProfile> {
    const verifyExistUser = await this.repository.findProfileEmail(
      params.email,
    );
    if (verifyExistUser) throw new ForbiddenException('Email already exist!');

    const passwordHash = generateCodeRandom(5);
    try {
      return exclude(
        await this.repository.createProfileAdmin({
          ...params,
          passwordHash,
        }),
        'passwordHash',
      );
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
