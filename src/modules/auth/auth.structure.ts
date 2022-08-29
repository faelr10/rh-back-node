import { LoginParams } from './models/params';

export type LoginResponse = {
  token: string;
};

export interface IAuthController {
  login(params: LoginParams): Promise<LoginResponse>;
}

export interface IAuthService {
  login(params: LoginParams): Promise<LoginResponse>;
}
