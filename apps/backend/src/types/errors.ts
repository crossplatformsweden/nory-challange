export interface ServiceError extends Error {
  status?: number;
  details?: unknown;
}

export function isServiceError(error: unknown): error is ServiceError {
  return error instanceof Error && 'status' in error;
}
