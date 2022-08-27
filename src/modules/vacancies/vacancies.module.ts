import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import { VacanciesController } from './vacancies.controller';
import { VacanciesRepository } from './vacancies.repository';
import { VacanciesService } from './vacancies.service';

@Module({
  controllers: [VacanciesController],
  providers: [PrismaService, VacanciesService, VacanciesRepository],
})
export class VacanciesModule {}
