interface ErrorMsg {
  msg: string;
}

interface ErrorResponse {
  errors: ErrorMsg[];
}

export const createErrorResponse = (msg: string): ErrorResponse => ({
  errors: [{ msg }],
});
