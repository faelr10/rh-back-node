export type RegisterProfileServiceParams = {
  name: string;
  email: string;
};

export type RegisterProfileRepositoryParams = {
  name: string;
  email: string;
  passwordHash: string;
};
