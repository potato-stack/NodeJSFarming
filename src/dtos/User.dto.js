export class RegisterDto {
  constructor({ name, email, password }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

export class LoginDto {
  constructor({ email, password }) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseDto {
  constructor({ token }) {
    this.token = token;
  }
}

export class UserInfoDto {
  constructor({ id, name, email, createdAt, updatedAt }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

export class UpdateUserDto extends RegisterDto {
  constructor({ id, name, email, password }) {
    super({ name, email, password });
    this.id = id;
  }
}


