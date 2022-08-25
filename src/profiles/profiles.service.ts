import { RegisterAdminParams } from "./models/profile-params";
import { IProfile, IProfileService } from "./profiles.structure";

export class ProfileService implements IProfileService {

    async registerAdmin(params: RegisterAdminParams): Promise<IProfile> {
        const profile: IProfile = {
            admin: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            email: '',
            id: '',
            name: ''
        }
        return profile
    }

}