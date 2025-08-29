export class UsersDto {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class LoginDto {
  constructor({email, password}) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseDto {
  constructor({token}) {
    this.token = token;
  }
}
