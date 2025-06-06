export class FieldError {
  constructor(
    public message: string,
    public field: string,
  ) {}
}
export class APIErrorResult {
  constructor(public errorsMessages: FieldError[]) {}
}
