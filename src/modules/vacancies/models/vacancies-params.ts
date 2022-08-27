export type CreateVacancyParams = {
  title: string;
  quantity: number;
  department: string;
};

export type FindAllVacanciesByDepartmentParams = {
  department: string;
};
