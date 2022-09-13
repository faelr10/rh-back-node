import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { ProfileRepository } from '../profiles/profile.repository';
import { VacanciesController } from './vacancies.controller';
import { VacanciesRepository } from './vacancies.repository';
import { VacanciesService } from './vacancies.service';

@Module({
  controllers: [VacanciesController],
  providers: [
    PrismaService,
    VacanciesService,
    VacanciesRepository,
    ProfileRepository,
  ],
})
export class VacanciesModule {}
