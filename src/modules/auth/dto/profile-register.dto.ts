import { IsEmail, IsString, MinLength } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @MinLength(3)
  readonly email: string;

  @IsString()
  @MinLength(3)
  readonly password: string;
}
