import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ProfileRepository } from '../profiles/profile.repository';
import { IProfileRepository } from '../profiles/profiles.structure';
import { IAuthService, LoginResponse } from './auth.structure';
import { LoginParams } from './models/params';
import * as bcrypt from 'bcrypt';
import * as base64 from 'base-64';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
  ) {}

  async login(params: LoginParams): Promise<LoginResponse> {
    const verifyEmail = await this.profileRepository.findProfileEmail(
      params.email,
    );
    if (!verifyEmail) throw new ForbiddenException('User not found');

    const verifyPassword = await bcrypt.compare(
      params.password,
      verifyEmail.passwordHash,
    );
    if (!verifyPassword)
      throw new ForbiddenException('User or password invalid!');

    const privateKey = base64.decode(process.env.SECRET_PRIV_KEY);

    const token = jwt.sign(
      {
        id: verifyEmail.id,
        admin: verifyEmail.admin,
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
