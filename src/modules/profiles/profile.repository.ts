import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { RegisterProfileRepositoryParams } from './models/profile-params';
import { IProfile, IProfileRepository } from './profiles.structure';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  createProfileAdmin(
    params: RegisterProfileRepositoryParams,
  ): Promise<IProfile> {
    return this.prisma.profile.create({
      data: {
        ...params,
        permission: 'Admin',
      },
    });
  }

  findProfileEmail(email: string): Promise<IProfile | null> {
    return this.prisma.profile.findUnique({
      where: { email },
    });
  }

  createProfileCandidates(
    params: RegisterProfileRepositoryParams,
  ): Promise<IProfile> {
    return this.prisma.profile.create({
      data: {
        ...params,
        permission: 'Candidate',
      },
    });
  }

  exists(where: any): Promise<any> {
    return this.prisma.profile.findFirst({
      where,
    });
  }
}
