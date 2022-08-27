import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profiles/profile.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';

@Module({
  imports: [ProfileModule, VacanciesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
