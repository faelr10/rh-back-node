import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';
import { VacanciesRepository } from './vacancies.repository';
import {
  IVacanciesRepository,
  IVacanciesService,
  IVacancy,
} from './vacancies.structure';

@Injectable()
export class VacanciesService implements IVacanciesService {
  constructor(
    @Inject(VacanciesRepository)
    private readonly repository: IVacanciesRepository,
  ) {}

  async createVacancy(params: CreateVacancyParams): Promise<IVacancy> {
    try {
      return await this.repository.createVacancy(params);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async findAllVacancies(): Promise<IVacancy[]> {
    return await this.repository.findAllVacancies();
  }

  async findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]> {
    return await this.repository.findAllVacanciesByDepartment(params);
  }
}
