export class User{
  public id: number
  public username: string;
  public email: string;
  public roles: string[];

  constructor(id: number, username: string, email: string, roles: string[]) {
    this.id = id
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
