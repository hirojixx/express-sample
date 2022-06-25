import { HttpError } from 'routing-controllers';

export class HttpException extends HttpError {
  public status: number;
  public override message: string;

  constructor(status: 400 | 409, message: string) {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
