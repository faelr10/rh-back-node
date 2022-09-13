import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/client';
import {
  ApplyVacancyParams,
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';
import {
  IApplyVacancy,
  IVacanciesRepository,
  IVacancy,
} from './vacancies.structure';

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

  existsVacancy(where: any): Promise<any> {
    return this.prisma.vacancies.findFirst({
      where,
    });
  }

  existsCandidacy(where: any): Promise<any> {
    return this.prisma.applyVacancy.findFirst({
      where,
    });
  }

  applyVacancy(params: ApplyVacancyParams): Promise<IApplyVacancy> {
    return this.prisma.applyVacancy.create({
      data: {
        ...params,
      },
    });
  }
}
