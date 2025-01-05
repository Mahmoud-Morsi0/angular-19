export interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, string | number | boolean>;
}

export interface HttpOptions {
  params?: QueryParams;
  headers?: Record<string, string>;
}
