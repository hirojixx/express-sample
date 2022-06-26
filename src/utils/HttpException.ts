import { HttpError } from 'routing-controllers';
type status = 400 | 404 | 409

export class HttpException extends HttpError {
  public status: status;
  public override message: string;

  constructor(status: 400 | 404 | 409, message: string) {
    super(status, message);
    this.status = status;
    this.message = message;
  }
}
