export interface IPagination<T> {
  data: T[];
  page: number;
  size: number;
  totalLenght: number;
}
