export class AppError extends Error {
  readonly status?: number;

  constructor(
    message: string,
    options?: {
      status?: number;
    },
  ) {
    super(message);

    this.name = "AppError";
    this.status = options?.status;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function isAppError(
  error: unknown,
): error is AppError {
  return error instanceof AppError;
}