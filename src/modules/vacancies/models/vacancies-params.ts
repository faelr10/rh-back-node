export type CreateVacancyParams = {
  title: string;
  quantity: number;
  department: string;
};

export type FindAllVacanciesByDepartmentParams = {
  department: string;
};

export type ApplyVacancyParams = {
  vacancy_id: string;
  profile_id: string;
};
