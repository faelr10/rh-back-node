export type CompareParams = {
  currentPassword: string;
  verifyPassword: string;
};

export interface IHash {
  newPasswordHash(password: string): Promise<string>;
  comparePassword(data: CompareParams): Promise<boolean>;
}
