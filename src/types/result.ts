export type Result<T, U> =
  | {
      data: T;
      error?: never;
    }
  | {
      data?: never;
      error: U;
    };
