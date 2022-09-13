import {
  ApplyVacancyParams,
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';
import { ApplyVacancyResponse } from './models/vacancies-response';

export type IVacancy = {
  id: string;
  title: string;
  quantity: number;
  department: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IApplyVacancy = {
  id: string;
  vacancy_id: string;
  profile_id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IVacanciesController {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[]>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
  applyVacancy(params: ApplyVacancyParams): Promise<ApplyVacancyResponse>;
}

export interface IVacanciesService {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[]>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
  applyVacancy(params: ApplyVacancyParams): Promise<ApplyVacancyResponse>;
}

export interface IVacanciesRepository {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[] | null>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
  existsVacancy(
    where: Partial<IVacancy> | any,
  ): Promise<boolean | IVacancy | any>;
  existsCandidacy(
    where: Partial<IApplyVacancy> | any,
  ): Promise<boolean | IApplyVacancy | any>;
  applyVacancy(params: ApplyVacancyParams): Promise<IApplyVacancy>;
}
