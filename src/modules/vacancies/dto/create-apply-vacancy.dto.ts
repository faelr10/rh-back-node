import { IsString, MinLength } from 'class-validator';
export class CreateApplyVacancyDto {
  @IsString()
  @MinLength(2)
  readonly vacancy_id: string;

  @IsString()
  @MinLength(2)
  readonly profile_id: string;
}
