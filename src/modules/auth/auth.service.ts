import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from '../profiles/profile.repository';
import { IProfileRepository } from '../profiles/profiles.structure';
import { IAuthService, LoginResponse } from './auth.structure';
import { LoginParams } from './models/params';
import * as bcrypt from 'bcrypt';
import * as base64 from 'base-64';
import * as jwt from 'jsonwebtoken';
import { IHash } from 'src/common/hash/structure';
import { Hash } from 'src/common/hash/hash';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
    @Inject(Hash) private readonly hash: IHash,
  ) {}

  async login(params: LoginParams): Promise<LoginResponse> {
    const verifyEmail = await this.profileRepository.findProfileEmail(
      params.email,
    );
    if (!verifyEmail) throw new ForbiddenException('User not found');

    const verifyPassword = await this.hash.comparePassword({
      currentPassword: verifyEmail.passwordHash,
      verifyPassword: params.password,
    });

    if (!verifyPassword)
      throw new ForbiddenException('User or password invalid!');

    const privateKey = base64.decode(process.env.SECRET_PRIV_KEY);

    const token = jwt.sign(
      {
        id: verifyEmail.id,
        permission: verifyEmail.permission,
      },
      privateKey,
      {
        expiresIn: '5d',
        algorithm: 'RS256',
      },
    );

    return { token: token };
  }
}
