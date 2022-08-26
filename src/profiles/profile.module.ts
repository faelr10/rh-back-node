import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { ProfileRepository } from './profile.repository';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';

@Module({
  controllers: [ProfileController],
  providers: [PrismaService, ProfileService, ProfileRepository],
})
export class ProfileModule {}
