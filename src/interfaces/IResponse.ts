export interface IResponse<T> {
  status: number;
  response: T;
  detail: string;
}
