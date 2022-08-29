import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { VacanciesModule } from './modules/vacancies/vacancies.module';

@Module({
  imports: [ProfileModule, VacanciesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
