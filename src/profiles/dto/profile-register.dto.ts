import { IsEmail, IsString, MinLength } from 'class-validator';
export class ProfileRegisterAdminDTO {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsEmail()
  @MinLength(3)
  readonly email: string;
}
