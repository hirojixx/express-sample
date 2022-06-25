export class CreateUser {
  public email: string;
  public name: string

  public password: string;

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name
  }
}
