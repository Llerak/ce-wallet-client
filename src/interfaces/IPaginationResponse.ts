export interface IPaginationResponse<T> {
  data: T[];
  page: number;
  size: number;
  totalLength: number;
}
