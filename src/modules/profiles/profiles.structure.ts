import { ProfileRegisterAdminDTO } from './dto/profile-register.dto';
import {
  RegisterAdminRepositoryParams,
  RegisterAdminServiceParams,
} from './models/profile-params';

export type IProfile = {
  id: string;
  name: string;
  email: string;
  permission: string;
  passwordHash?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IProfileController {
  registerAdmin(params: RegisterAdminServiceParams): Promise<IProfile>;
}

export interface IProfileService {
  registerAdmin(params: RegisterAdminServiceParams): Promise<IProfile>;
}

export interface IProfileRepository {
  createProfileAdmin(params: RegisterAdminRepositoryParams): Promise<IProfile>;
  findProfileEmail(email: string): Promise<IProfile | null>;
}
