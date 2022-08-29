import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { ProfileRepository } from '../profiles/profile.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, ProfileRepository, AuthService],
})
export class AuthModule {}
