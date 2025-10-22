export class User{
  public id: number
  public username: string;
  public email: string;
  public roles: Role[];

  constructor(id: number, username: string, email: string, roles: Role[]) {
    this.id = id
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}

class Role{
  public id: number
  public name: string;

  constructor(id: number, name: string) {
    this.id = id
    this.name = name;
  }
}
