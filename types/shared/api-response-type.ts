export type ApiResponseType<T> = {
  status: boolean;
  code: string;
  data?: T;
  message?: string;
};
