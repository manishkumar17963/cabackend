class CustomError extends Error {
  constructor(
    public errorType: string = "Generic",
    public status: number = 500,
    ...params: string[]
  ) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.errorType = errorType;
    this.status = status;
    this.name = "ClientError";
  }
}
export default CustomError;
