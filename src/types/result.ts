export type Result<TData, TError extends Error> =
  | SuccessResult<TData>
  | ErrorResult<TError>;

export interface SuccessResult<TData> {
  success: true;
  data: TData;
}

export interface ErrorResult<TError extends Error> {
  success: false;
  error: TError;
}
