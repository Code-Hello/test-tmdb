export type Res<T> = T;

export type PaginatedRes<T> = {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
};
