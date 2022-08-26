import { Module } from '@nestjs/common';
import { ProfileModule } from './modules/profiles/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
