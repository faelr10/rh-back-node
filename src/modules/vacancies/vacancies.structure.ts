import {
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';

export type IVacancy = {
  id: string;
  title: string;
  quantity: number;
  department: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IVacanciesController {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[]>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
}

export interface IVacanciesService {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[]>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
}

export interface IVacanciesRepository {
  createVacancy(params: CreateVacancyParams): Promise<IVacancy>;
  findAllVacancies(): Promise<IVacancy[] | null>;
  findAllVacanciesByDepartment(
    params: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]>;
}
