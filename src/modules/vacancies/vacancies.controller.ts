import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { FindAllVacanciesByDepartmentParams } from './models/vacancies-params';
import { VacanciesService } from './vacancies.service';
import {
  IVacanciesController,
  IVacanciesService,
  IVacancy,
} from './vacancies.structure';

@Controller('vacancies')
export class VacanciesController implements IVacanciesController {
  constructor(
    @Inject(VacanciesService) private readonly service: IVacanciesService,
  ) {}

  @Post()
  createVacancy(@Body() params: CreateVacancyDto): Promise<IVacancy> {
    return this.service.createVacancy(params);
  }

  @Get()
  findAllVacancies(): Promise<IVacancy[]> {
    return this.service.findAllVacancies();
  }

  @Get(':department')
  findAllVacanciesByDepartment(
    @Param() department: FindAllVacanciesByDepartmentParams,
  ): Promise<IVacancy[]> {
    return this.service.findAllVacanciesByDepartment(department);
  }
}
