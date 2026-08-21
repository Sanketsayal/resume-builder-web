import axios from "axios";

import { AppError } from "./AppErrors";

interface ApiErrorResponse {
  success: false;
  message: string;
}

export function normalizeError(
  error: unknown,
): AppError {
  /*
   * Already normalized.
   */
  if (error instanceof AppError) {
    return error;
  }

  /*
   * Not an Axios error.
   */
  if (!axios.isAxiosError(error)) {
    return new AppError(
      "Something went wrong.",
    );
  }

  /*
   * Request was sent but no response
   * was received from the server.
   */
  if (!error.response) {
    return new AppError(
      "Unable to connect to the server.",
    );
  }

  const status = error.response.status;

  const data =
    error.response.data as
      | Partial<ApiErrorResponse>
      | undefined;

  /*
   * Your backend's message.
   */
  const message =
    typeof data?.message === "string"
      ? data.message
      : "Something went wrong.";

  return new AppError(message, {
    status,
  });
}