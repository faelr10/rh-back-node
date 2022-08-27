import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import {
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';
import { IVacanciesRepository, IVacancy } from './vacancies.structure';

@Injectable()
export class VacanciesRepository implements IVacanciesRepository {
  constructor(private readonly prisma: PrismaService) {}

  createVacancy(params: CreateVacancyParams): Promise<IVacancy> {
    return this.prisma.vacancies.create({
      data: {
        ...params,
      },
    });
  }

  findAllVacancies(): Promise<IVacancy[] | null> {
    return this.prisma.vacancies.findMany();
  }

  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]> {
    return this.prisma.vacancies.findMany({
      where: { department: params.department },
    });
  }
}
