import { Module } from '@nestjs/common';
import { Hash } from 'src/common/hash/hash';
import { PrismaService } from 'src/database/client';
import { ProfileRepository } from '../profiles/profile.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, Hash, ProfileRepository, AuthService],
})
export class AuthModule {}
