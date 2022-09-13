import {
  RegisterProfileRepositoryParams,
  RegisterProfileServiceParams,
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
  registerAdmin(params: RegisterProfileServiceParams): Promise<IProfile>;
  registerCandidates(params: RegisterProfileServiceParams): Promise<IProfile>;
}

export interface IProfileService {
  registerAdmin(params: RegisterProfileServiceParams): Promise<IProfile>;
  registerCandidates(params: RegisterProfileServiceParams): Promise<IProfile>;
}

export interface IProfileRepository {
  createProfileAdmin(
    params: RegisterProfileRepositoryParams,
  ): Promise<IProfile>;
  createProfileCandidates(
    params: RegisterProfileRepositoryParams,
  ): Promise<IProfile>;
  findProfileEmail(email: string): Promise<IProfile | null>;
  exists(where: Partial<IProfile> | any): Promise<boolean | IProfile | any>;
}
