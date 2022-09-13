import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { RegisterProfileServiceParams } from './models/profile-params';
import { ProfileRepository } from './profile.repository';
import {
  IProfile,
  IProfileRepository,
  IProfileService,
} from './profiles.structure';
import generateCodeRandom from 'src/helpers/generateCodeRandom';
import exclude from 'src/validations/excludeProperties';
import { Hash } from 'src/common/hash/hash';
import { IHash } from 'src/common/hash/structure';

@Injectable()
export class ProfileService implements IProfileService {
  constructor(
    @Inject(ProfileRepository) private readonly repository: IProfileRepository,
    @Inject(Hash) private readonly hash: IHash,
  ) {}

  async registerAdmin(params: RegisterProfileServiceParams): Promise<IProfile> {
    const verifyExistUser = await this.repository.findProfileEmail(
      params.email,
    );
    if (verifyExistUser) throw new ForbiddenException('Email already exist!');

    const codePassword = generateCodeRandom(5);
    const passwordHash = await this.hash.newPasswordHash(codePassword);
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

  async registerCandidates(
    params: RegisterProfileServiceParams,
  ): Promise<IProfile> {
    const verifyExistUser = await this.repository.findProfileEmail(
      params.email,
    );
    if (verifyExistUser) throw new ForbiddenException('Email already exist!');

    const codePassword = generateCodeRandom(5);
    const passwordHash = await this.hash.newPasswordHash(codePassword);
    try {
      return exclude(
        await this.repository.createProfileCandidates({
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
