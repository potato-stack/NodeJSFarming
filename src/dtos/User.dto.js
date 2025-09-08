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
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class UpdateUserDto extends RegisterDto {
  constructor({ targetId, name, email, password }) {
    super({ name, email, password });
    this.targetId = targetId;
  }
}

export class UserGardensQueryDto {
  constructor({ user_id, garden_id }) {
    this.user_id = user_id;
    this.garden_id = garden_id || null;
  }
}

export class UsersOfGardenDto extends UserInfoDto {
  constructor({ id, name, email, createdAt, updatedAt, role }) {
    super({ id, name, email, createdAt, updatedAt });
    this.role = role;
  }
}
