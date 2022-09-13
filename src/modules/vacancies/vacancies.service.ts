import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ProfileRepository } from '../profiles/profile.repository';
import { IProfileRepository } from '../profiles/profiles.structure';
import {
  ApplyVacancyParams,
  CreateVacancyParams,
  FindAllVacanciesByDepartmentParams,
} from './models/vacancies-params';
import { ApplyVacancyResponse } from './models/vacancies-response';
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
    @Inject(ProfileRepository)
    private readonly profileRepository: IProfileRepository,
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

  async applyVacancy(
    params: ApplyVacancyParams,
  ): Promise<ApplyVacancyResponse> {
    const verifyExistVacancy = await this.repository.existsVacancy({
      id: params.vacancy_id,
    });
    if (!verifyExistVacancy)
      throw new ConflictException('Vacancy does not exist');

    const verifyExistCandidate = await this.profileRepository.exists({
      id: params.profile_id,
      permission: 'Candidate',
    });
    if (!verifyExistCandidate)
      throw new ConflictException('Candidate does not exist');

    const verifyCandidacy = await this.repository.existsCandidacy({
      vacancy_id: params.vacancy_id,
      profile_id: params.profile_id,
    });
    if (verifyCandidacy)
      throw new ConflictException(
        'Candidate has already applied for this vacancy',
      );

    try {
      await this.repository.applyVacancy(params);
      return { message: 'Application successfully completed! Good luck!' };
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
