import { IsNumber, IsString, MinLength } from 'class-validator';
export class CreateVacancyDto {
  @IsString()
  @MinLength(2)
  readonly title: string;

  @IsNumber()
  readonly quantity: number;

  @IsString()
  @MinLength(2)
  readonly department: string;
}
