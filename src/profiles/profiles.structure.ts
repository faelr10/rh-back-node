import { RegisterAdminParams } from "./models/profile-params";

export type IProfile = {
    id: string;
    name: string;
    email: string;
    admin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProfileController {
    registerAdmin(params: RegisterAdminParams): Promise<IProfile>
}

export interface IProfileService {
    registerAdmin(params: RegisterAdminParams): Promise<IProfile>
}