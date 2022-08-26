import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { RegisterAdminRepositoryParams } from './models/profile-params';
import { IProfile, IProfileRepository } from './profiles.structure';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  createProfileAdmin(params: RegisterAdminRepositoryParams): Promise<IProfile> {
    return this.prisma.profile.create({
      data: {
        ...params,
        admin: true,
      },
    });
  }

  findProfileEmail(email: string): Promise<IProfile | null> {
    return this.prisma.profile.findUnique({
      where: { email },
    });
  }
}
